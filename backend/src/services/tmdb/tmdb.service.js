import TmdbClient from './tmdb.client.js';
import { 
    extractCast, 
    extractDirectors, 
    extractWatchProviders 
} from './tmdb.mapper.js';

const tmdbClient = new TmdbClient({ 
    apiKey: process.env.TMDB_API_KEY,
    maxRequests: parseInt(process.env.TMDB_MAX_REQUESTS),
    maxRequestsTimePeriodMs: parseInt(process.env.TMDB_REQUEST_PERIOD_MS),
    responseTimeoutMs: parseInt(process.env.TMDB_TIMEOUT_MS),
});

export async function getFilmById(tmdbId) {
        const response = await tmdbClient.request({
            method: 'get',
            url: `/movie/${tmdbId}`,    
            params: {
                append_to_response: 'watch/providers,credits,images',
                include_image_language: 'en-US',
            }
        });
       
        const filmDetails = response.data;

        // create film object
        const film = {
            tmdbid: filmDetails.id ?? null,
            title: filmDetails.title ?? null,
            genres: filmDetails.genres?.map(g => g.name) || [],
            director: extractDirectors(filmDetails.credits.crew),
            release_date: filmDetails.release_date ?? null,
            trailer: null,
            poster: filmDetails.poster_path ?? null,
            banner: filmDetails.backdrop_path ?? null,
            ratings: [],
            cinema: [],
            super_like: false,
            runtime: filmDetails.runtime ?? null,
            overview: filmDetails.overview ?? null,
            top_cast: extractCast(filmDetails.credits.cast, 10),
            logo: filmDetails.images?.logos?.[0]?.file_path ?? null,
            streaming: extractWatchProviders(filmDetails['watch/providers']?.results),
        }

        return film
};

export async function searchForFilm(searchString, page) {
        const response = await tmdbClient.request({
            method: 'get',
            url: `/search/movie`,
            params: {
                query: encodeURIComponent(searchString),
                page: page || 1, // default to page 1 if not provided
            }
        });

        const searchReults = response.data;
        return searchReults;

};

export async function getCurrentlyPopularFilms(pageNum) {
        const response = await tmdbClient.request({
            method: 'get',
            url: `/movie/popular`,
            params: {
                language: 'en-US',
                page: pageNum,
            }
        });

        const popularFilms = [];
        response.data.results.forEach(film => {
            popularFilms.push({
                tmdbid: film.id,
                title: film.title,
                poster: film.poster_path || null,
                streaming: [], // TODO: can append providers to popular films endpoint?
            });
        });

        response.data.results = popularFilms;

        return response.data;
};

export async function getStreamingProviders(tmdbId) {
    const response = await tmdbClient.request({
        method: 'get',
        url: `/movie/${tmdbId}/watch/providers`,
    });

    return extractWatchProviders(response.data.results);
}
