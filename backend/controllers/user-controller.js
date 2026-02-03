const User = require('../models/user.js');

// get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const username = await User.findById(req.user.id).select('username -_id').lean();

        if (!username) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(username);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
