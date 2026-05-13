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

    // clean and extract response
    return {
        id: filmDetails.id ?? null,
        title: filmDetails.title ?? null,
        release_date: filmDetails.release_date ?? null,
        poster_path: filmDetails.poster_path ?? null,
        backdrop_path: filmDetails.backdrop_path ?? null,
        runtime: filmDetails.runtime ?? null,
        overview: filmDetails.overview ?? null,
        directors: extractDirectors(filmDetails.credits.crew),
        top_cast: extractCast(filmDetails.credits.cast, 10),
        logo: filmDetails.images?.logos?.[0]?.file_path ?? null,
        providers: extractWatchProviders(filmDetails['watch/providers']?.results),
    }
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

export async function getWatchProviders() {
    const response = await tmdbClient.request({
        method: 'get',
        url: '/watch/providers/movie',
        params: {
            language: 'en-US',
            watch_region: 'GB',
        }
    });

    return response.data.results;
}
