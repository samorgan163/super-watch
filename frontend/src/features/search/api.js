import { apiFetch } from '../../lib/api';

export const searchFilms = (formattedQuery, pageNum, signal) => {
    return apiFetch(`/film/search?title=${encodeURIComponent(formattedQuery)}&page=${encodeURIComponent(pageNum)}`, {
        method: 'GET',
        signal,
    });
};
