const axios = require('axios');

//const dotenv = require('dotenv').config();

const apiKey = process.env.TMDB_API_KEY;
const apiBase = "https://api.themoviedb.org/3";
const responseTimeout = 5000; // how long to wait for response before failure

const providers = new Map([
    [8, "NETFLIX"],
    [1796, "NETFLIX"],
    [9, "PRIME"],
    [119, "PRIME"],
    [613, "PRIME"],
    [2100, "PRIME"],
    [38, "BBC"],
    [41, "ITVX"],
    [103, "C4"],
]);

const tmdb = axios.create({
    baseURL: apiBase,
    timeout: responseTimeout,
    headers: {
        Authorization: `Bearer ${apiKey}`,
    },
});

// if 401 - api key revoked or service blocked. Add a gate, to stop sending more requests.
// same for rate limit etc.
// https://developer.themoviedb.org/docs/errors
function _handleError(error) {
    if (error.response) {
        const status = error.response.status;
        const tmdbCode = error.response.data.status_code;
        const tmdbMessage = error.response.data.status_message;

        if (status === 401 || status === 403) {
            throw { code: 'TMDB_AUTH_ERROR', TMDB_CODE: tmdbCode, message: tmdbMessage };
        }
        if (status === 404) {
            throw { code: 'TMDB_NOT_FOUND', TMDB_CODE: tmdbCode, message: tmdbMessage };
        }
        if (status === 429) {
            throw { code: 'TMDB_RATE_LIMIT', TMDB_CODE: tmdbCode, message: tmdbMessage };
        }
        if (status >= 500) {
            throw { code: 'TMDB_DOWN', TMDB_CODE: tmdbCode, message: tmdbMessage };
        }
    }
    if (error.code === 'ECONNABORTED') {
        throw { code: 'TMDB_TIMEOUT', message: 'TMDb request timed out' };
    }
    throw { code: 'TMDB_UNKNOWN_ERROR', message: 'Unknown TMDb error', error };
}

async function _withRetry(fn, retries = 3, delay = 500) {
    try {
        return await fn();
    }
    catch (error) {
        if (retries <= 0) throw error;

        // Only retry on transient errors
        if (error.code === 'TMDB_DOWN' ||
            error.code === 'TMDB_TIMEOUT' ||
            error.code === 'TMDB_RATE_LIMIT'
        ) {
            console.warn(
                `⚠️ TMDb error (${error.code}). Retrying in ${delay}ms... (${retries} retries left)`
            );
            await new Promise(res => setTimeout(res, delay));
            return _withRetry(fn, retries - 1, delay * 2); // exponential backoff
        }

        throw error; // Non-retryable (e.g., TMDB_AUTH_ERROR)
    }
}

exports.getFilmById = async (tmdbId) => {
    const film = await _withRetry(async () => {
        console.log('tmdb api pull request');
        try {
            const response = await tmdb.get(`/movie/${tmdbId}?append_to_response=watch/providers,credits`);
            const filmDetails = response.data;

            // create film object
            const film = {
                tmdbid: filmDetails.id, // better to get the response id?
                title: filmDetails.title,
                genres: filmDetails.genres.map(g => g.name),
                director: filmDetails.credits.crew
                            .filter(person => person.job === 'Director')
                            .map(person => ({
                                id: person.id,
                                name: person.name,
                            })),
                release_date: filmDetails.release_date,
                trailer: null,
                poster: `https://image.tmdb.org/t/p/w400${filmDetails.poster_path}`,
                banner: `https://image.tmdb.org/t/p/w400${filmDetails.backdrop_path}`,
                ratings: [],
                streaming: [],
                cinema: [],
                super_like: false,
                runtime: filmDetails.runtime,
                overview: filmDetails.overview,
                top_cast: filmDetails.credits.cast
                            .slice(0, 10)
                            .map(person => ({
                                id: person.id,
                                name: person.name,
                                role: person.character,
                                poster: person.profile_path
                            }))
            }

            // filter streaming providers
            const watchProviders = filmDetails["watch/providers"];
            //const watchProvidersGB = watchProviders?.results?.GB?.flatrate;
            const watchProvidersGB = [
                ...(watchProviders?.results?.GB?.flatrate ?? []),
                ...(watchProviders?.results?.GB?.ads ?? []),
            ];
            // check if any providers for film
            if (Array.isArray(watchProvidersGB) && watchProvidersGB.length > 0) {
                const streamingSet = new Set(film.streaming); // start with existing items, if any
                watchProvidersGB.forEach(service => {
                    const providerName = providers.get(service.provider_id);
                    if (providerName) {
                        streamingSet.add(providerName); // duplicates automatically ignored
                    }
                });
                film.streaming = Array.from(streamingSet);
            }

            return film
        }
        catch (error) {
            _handleError(error);
        }
    });
    return film;
}

exports.searchForFilm = async (searchString, page) => {
    const searchReults = await _withRetry(async () => {
        console.log('tmdb api pull request');
        try {
            const response = await tmdb.get(`/search/movie`, {
                params: {
                    query: searchString,
                    page: page || 1, // default to page 1 if not provided
                }
            });
            const searchReults = response.data;
            return searchReults;
        }
        catch (error) {
            _handleError(error);
        }
    });
    return searchReults;
}

exports.getStreamingProvidersById = async (tmdbId) => {
    const streamingProviders = await _withRetry(async () => {
        console.log('tmdb api pull request');
        try { // https://api.themoviedb.org/3/movie/1124620/watch/providers
            const response = await tmdb.get(`/movie/${tmdbId}/watch/providers`);

            // get GB streaming subscription and free with ads
            const watchProvidersGB = [
                ...(response.data?.results?.GB?.flatrate ?? []),
                ...(response.data?.results?.GB?.ads ?? []),
            ];
            // check if any providers for film
            if (Array.isArray(watchProvidersGB) && watchProvidersGB.length > 0) {
                const streamingSet = new Set();
                watchProvidersGB.forEach(service => {
                    const providerName = providers.get(service.provider_id);
                    if (providerName) {
                        streamingSet.add(providerName); // duplicates automatically ignored
                    }
                });
                return Array.from(streamingSet);
            }
            return [];
        }
        catch (error) {
            _handleError(error);
        }
    });
    return streamingProviders;
}

// returns array of all directors
exports.getDirector = async (tmdbId) => {
    const director = await _withRetry(async () => {
        console.log('tmdb api pull request');
        // const creditsUrl = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${apiKey}`;
        try {
            const response = await tmdb.get(`/movie/${tmdbId}/credits`);
            const results = response.data;
            const directors_filter = results.crew.filter(c => c.job === 'Director');
            const directors = [];
            directors_filter.forEach(director => {
                directors.push(director.name);
            });
            return directors;
        }
        catch (error) {
            _handleError(error);
        }
    });
    return director;
}

// returns cast
exports.getCast = async (tmdbId) => {
    const cast = await _withRetry(async () => {
        console.log('tmdb api pull request');
        try {
            const response = await tmdb.get(`/movie/${tmdbId}/credits`);
            const results = response.data;
            return results.cast;
        }
        catch (error) {
            _handleError(error);
        }
    });
    return cast;
}
