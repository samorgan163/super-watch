const tmdbApi = require('../apis/tmdb.js');

// get film by tmdb id
exports.getFilmByTmdbId = async (req, res) => {
    const tmdbId = req.params.tmdbId;
    try {
        const film = await tmdbApi.getFilmById(tmdbId);
        return res.status(200).json(film);
    }
    catch (error) {
        if (error.code === 'TMDB_NOT_FOUND') {
            return res.status(404).json({ message: 'Film not found.' });
        }
        return res.status(500).json({ message: 'Server error.' });
    }
};
