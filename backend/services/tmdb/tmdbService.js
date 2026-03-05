const TmdbClient = require('./client');
const { extractCast, extractDirectors, extractWatchProviders } = require('./mappers');

const apiKey = process.env.TMDB_API_KEY;

const tmdbClient = new TmdbClient(apiKey);

exports.getFilmById = async (tmdbId) => {
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
            tmdbid: filmDetails.id,
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
};

exports.searchForFilm = async (searchString, page) => {
        const response = await tmdbClient.request({
            method: 'get',
            url: `/search/movie`,
            params: {
                query: searchString,
                page: page || 1, // default to page 1 if not provided
            }
        });

        const searchReults = response.data;
        return searchReults;

};

exports.getCurrentlyPopularFilms = async (pageNum) => {
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
