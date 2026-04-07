import { apiFetch } from '../../lib/api';

export const getFilm = (tmdbID) => {
    return apiFetch(`/film/${encodeURIComponent(tmdbID)}`, {
        method: 'GET',
    });
};
