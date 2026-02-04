const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },

	watchlist: [
		{
			film: {
				type: Schema.Types.ObjectId,
				ref: 'Film',
				required: true,
		},
			addedAt: {
				type: Date,
				default: Date.now,
			},
		}
	]

});

// prevent duplicate film entries in watchlist, per user
userSchema.index(
	{ _id: 1, 'watchlist.film': 1 },
	{ unique: true }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
