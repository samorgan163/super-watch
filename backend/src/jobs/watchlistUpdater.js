import Film from '../models/film.model.js';
import { getStreamingProviders } from '../services/tmdb/tmdb.service.js';

// TODO: Batch db pull in future and batch updates
// tmdb service handles rate limits but has no retry
// updates are currently done in seq with a timeout to avoid blocking users
export async function watchlistUpdater() {
    console.log('Starting watchlist updater');

    // TODO: might need to batch db pulls in future
    const films = await Film.find({});

    for (const film of films) {
        console.log(`Updating streaming providers for ${film.title}`);
        await updateWatchlistFilm(film);
        await new Promise(resolve => setTimeout(resolve, 500));
    }

    console.log('Finished updating watchlist films');
}

async function updateWatchlistFilm(film) {
    const newStreamingProviders = await getStreamingProviders(film.tmdbid);
    const oldStreamingProviders = film.streaming || [];

    if (!arraysEqual(oldStreamingProviders, newStreamingProviders)) {
        film.streaming = newStreamingProviders;
        await film.save();
        console.log(`Updated streaming providers for ${film.title}`);

        // only notify user if streaming becomes available,
        // not if there is a new provider added.
        if (oldStreamingProviders.length === 0 && newStreamingProviders.length > 0) {
            // TODO: send notifications to users
            console.log(`${film.title} is now available on ${newStreamingProviders[0]}`);
        }
    }
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    const setA = new Set(a);
    return b.every(x => setA.has(x));
}
