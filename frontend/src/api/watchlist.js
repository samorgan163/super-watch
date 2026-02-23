import { apiFetch } from "./client";

export const getWatchlist = () => {
    return apiFetch('/watchlist', {
        method: 'GET',
    });
};

export const checkWatchlist = (tmdbID) => {
    return apiFetch(`/watchlist/check/${encodeURIComponent(tmdbID)}`, {
        method: 'GET',
    });
};

export const addToWatchlist = (tmdbID) => {
    return apiFetch(`/watchlist/${encodeURIComponent(tmdbID)}`, {
        method: 'POST',
    });
};

export const removeFromWatchlist = (tmdbID) => {
    return apiFetch(`/watchlist/${encodeURIComponent(tmdbID)}`, {
        method: 'DELETE',
    });
};
