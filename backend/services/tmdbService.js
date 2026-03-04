const axios = require('axios');
const rateLimit = require('axios-rate-limit');

const { NotFoundError, ServiceUnavailableError } = require('../errors/customErrors.js');

// TMDB error codes
// https://developer.themoviedb.org/docs/errors

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

// Block request to tmdb if api key gets revoked.
let isBlocked = false;

function blockRequests() {
    isBlocked = true;
}
function unblockRequests() {
    isBlocked = false;
}

// Block requests if rate limited
let isRateLimited = false;

// block requests for 5 seconds
// TODO: implement retry, especially because cron jobs will fail.
function handleRateLimited() {
    if (!isRateLimited) {
        isRateLimited = true;
        setTimeout(() => {
            isRateLimited = false;
        }, 5000);
    }
}

// Base request
const tmdb = axios.create({
    baseURL: apiBase,
    timeout: responseTimeout,
    headers: {
        Authorization: `Bearer ${apiKey}`,
    },
});

const rateLimitedTmdb = rateLimit(
    tmdb, 
    { 
        maxRequests: 10, 
        perMilliseconds: 1000, 
    }
);

async function sendTmdbRequest(config) {
    console.log('tmdb api pull request');

    if (isBlocked) {
        throw new ServiceUnavailableError('TMDb api key issue');
    }

    if (isRateLimited) {
        throw new ServiceUnavailableError('TMDB rate limit exceeded');
    }

    return rateLimitedTmdb.request(config); // return the promise
}


// if 401 - api key revoked or service blocked. Add a gate, to stop sending more requests.
// same for rate limit etc.
// https://developer.themoviedb.org/docs/errors
function _handleError(error) {

    if (error instanceof ServiceUnavailableError) {
        return error;
    }

    if (error.response) {
        const status = error.response.status;
        const tmdbCode = error.response.data.status_code;
        const tmdbMessage = error.response.data.status_message;

        if (status === 429) {
            handleRateLimited();
            return new ServiceUnavailableError('TMDb limit exceeded. Please try again later.', { cause: error});
        }

        if (status === 401 || status === 403) {
            if (tmdbCode === 7 || 
                tmdbCode === 10 || 
                tmdbCode === 31 || 
                tmdbCode === 33 ||
                tmdbCode === 35 ||
                tmdbCode === 45
            ) {
                blockRequests();
                return new ServiceUnavailableError('TMDb api key issue', { cause: error});
            }
        }

        if (status === 404) {
            return new NotFoundError('TMDB not found');
        }

        return new ServiceUnavailableError(`TMDB error, code: ${tmdbCode}`, { cause: error});        
    }
    
    return new ServiceUnavailableError('Unknown TMDB error', { cause: error});
};

function extractWatchProviders(watchProviders) {
    // get streaming availablility in UK
    const watchProvidersGB = [
        ...(watchProviders?.GB?.flatrate ?? []),
        ...(watchProviders?.GB?.ads ?? []),
    ];

    if (watchProvidersGB.length < 1) {
        return [];
    }

    const streamingSet = new Set();

    // filter from given services
    watchProvidersGB.forEach(service => {
        const providerName = providers.get(service.provider_id);
        if (providerName) {
            streamingSet.add(providerName); // duplicates automatically ignored
        }
    });
    
    return Array.from(streamingSet);
}

function extractDirectors(crew = []) {
    return crew
        .filter(person => person.job === 'Director')
        .map(person => ({
            id: person.id,
            name: person.name,
        }))
}

function extractCast(cast = [], quantity = cast.length) {
    return cast
        .slice(0, Math.max(0, quantity))
        .map(person => ({
            id: person.id,
            name: person.name,
            role: person.character,
            poster: person.profile_path,
        }))
}

exports.getFilmById = async (tmdbId) => {
    try {

        const response = await sendTmdbRequest({
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
            tmdbid: filmDetails.id, // better to get the response id?
            title: filmDetails.title,
            genres: filmDetails.genres.map(g => g.name),
            director: extractDirectors(filmDetails.credits.crew),
            release_date: filmDetails.release_date,
            trailer: null,
            poster: filmDetails.poster_path,
            banner: filmDetails.backdrop_path,
            ratings: [],
            cinema: [],
            super_like: false,
            runtime: filmDetails.runtime,
            overview: filmDetails.overview,
            top_cast: extractCast(filmDetails.credits.cast, 10),
            logo: filmDetails.images?.logos?.[0]?.file_path || null,
            streaming: extractWatchProviders(filmDetails['watch/providers'].results),
        }

        return film
    }
    catch (error) {
        throw _handleError(error);
    }
};

exports.searchForFilm = async (searchString, page) => {
    try {
        const response = await sendTmdbRequest({
            method: 'get',
            url: `/search/movie`,
            params: {
                query: searchString,
                page: page || 1, // default to page 1 if not provided
            }
        });

        const searchReults = response.data;
        return searchReults;
    }
    catch (error) {
        throw _handleError(error);
    }
};

exports.getStreamingProvidersById = async (tmdbId) => {
    try { 
        const response = await sendTmdbRequest({
            method: 'get',
            url: `/movie/${tmdbId}/watch/providers`,
        });

        return extractWatchProviders(response.data.results);
    }
    catch (error) {
        throw _handleError(error);
    }
};

// returns array of all directors
exports.getDirector = async (tmdbId) => {
    try {
        const response = await sendTmdbRequest({
            method: 'get',
            url: `/movie/${tmdbId}/credits`,
        });

        const results = response.data;
        const directors_filter = results.crew.filter(c => c.job === 'Director');
        const directors = [];
        directors_filter.forEach(director => {
            directors.push(director.name);
        });
        return directors;
    }
    catch (error) {
        throw _handleError(error);
    }
};

// returns cast
exports.getCast = async (tmdbId) => {
    try {
        const response = await sendTmdbRequest({
            method: 'get',
            url: `/movie/${tmdbId}/credits`,
        });

        const results = response.data;
        return results.cast;
    }
    catch (error) {
        throw _handleError(error);
    }
};

exports.getCurrentlyPopularFilms = async (pageNum) => {
    try {
        const response = await sendTmdbRequest({
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
                streaming: [], // to be filled in later with separate requests
            });
        });

        response.data.results = popularFilms; // overwrite results with simplified object

        return response.data;
    }
    catch (error) {
        throw _handleError(error);
    }
};
