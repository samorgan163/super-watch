export const watchlistKeys = {
    all: ['watchlist'],
    list: (userId) => ['watchlist', userId],
    check: (userId, tmdbId) => ['watchlist', userId, tmdbId],
}