import { NotFoundError } from '../errors/customErrors.js';

import * as userModel from '../models/user.model.js';

// get user profile
export async function getUserProfile(req, res, next) {
    const userId = req.user.id;

    try {
        //const username = await User.findById(userID).select('username -_id').lean();

        const user = await userModel.getProfileUserById(userId);

        if (!user) {
            return next(new NotFoundError('User not found'));
        }

        return res.status(200).json(user);
    }
    catch (error) {
        next(error);
    }
};
