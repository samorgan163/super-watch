import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const filmSchema = new Schema({
    tmdbid: { type: Number, required: true, unique: true, index: true },
    title: { type: String },
    release_date: { type: Date },
    poster: { type: String }, // poster image URL
    streaming: [{ type: String }], // array of streaming platform names
    
}, { timestamps: false });

const Film = model('Film', filmSchema);

export default Film;
