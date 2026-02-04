const Film = require('../models/film.js');
const User = require('../models/user.js');
const tmdbApi = require('../apis/tmdb.js');

async function createFilmObject(tmdbid) {
    try {
        const tmdbRes = await tmdbApi.getFilmById(tmdbid);

        const newFilm = {
            tmdbid: tmdbRes.tmdbid,
            title: tmdbRes.title,
            release_date: tmdbRes.release_date,
            poster: tmdbRes.poster,
            streaming: tmdbRes.streaming,
        };

        return newFilm;
    }
    catch (error) {
        throw new Error('tmdb fetch error: ' + error.message);
    }
}

exports.addFilmToWatchlist = async (req, res) => {
    const userId = req.user.id;
    const { tmdbid } = req.body;

    try {
        // find or create film in films collection
        // this uses upsert to avoid duplicates
        // the checking for film and insertion if not found is done in one db call, making it atomic
        const film = await Film.findOneAndUpdate(
            { tmdbid },
            { $setOnInsert: await createFilmObject(tmdbid) },
            { new: true, upsert: true }
        );

        // add films to users watchlist if not already present
        const result = await User.updateOne(
            { _id: userId, 'watchlist.film': { $ne: film._id }},
            { $push: { watchlist: { film: film._id } } }
        );

        // if no documents were modified, film was already in watchlist
        if (result.modifiedCount === 0) {
            return res.status(200).json({ message: 'Film already in watchlist' });
        }

        return res.status(200).json({ message: 'Film added to watchlist' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Error adding film to watchlist: ' + error.message });
    }
};