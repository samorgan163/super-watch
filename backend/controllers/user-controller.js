const User = require('../models/user.js');
const { NotFoundError } = require('../errors/customErrors.js');

// get user profile
exports.getUserProfile = async (req, res, next) => {
    const userID = req.user.id;

    try {
        const username = await User.findById(userID).select('username -_id').lean();

        if (!username) {
            return next(new NotFoundError('User not found'));
        }

        return res.status(200).json(username);
    }
    catch (error) {
        next(error);
    }
};
