import { apiFetch } from "./client";

export const getFilm = (tmdbID) => {
    return apiFetch(`/film/${encodeURIComponent(tmdbID)}`, {
        method: 'GET',
    });
};

export const searchFilms = (formattedQuery, pageNum, signal) => {
    return apiFetch(`/film/search?title=${encodeURIComponent(formattedQuery)}&page=${encodeURIComponent(pageNum)}`, {
        method: 'GET',
        signal,
    });
};
