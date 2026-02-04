const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const filmSchema = new Schema({
    tmdbid: { type: Number, required: true, unique: true, index: true },
    title: { type: String },
    release_date: { type: Date },
    poster: { type: String }, // poster image URL
    streaming: [{ type: String }], // array of streaming platform names
    
}, { timestamps: false });

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
