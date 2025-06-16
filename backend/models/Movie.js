import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: {
        type: String,
        required: true,
        maxLength: 500
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    }
}, { timestamps: true });


const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 128
    },
    image: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true
    },
    genre: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genre',
        required: true
    },
    description: {
        type: String,
        required: true,
        maxLength: 500
    },
    cast: [{
        type: String,
        required: true,
        trim: true,
        maxLength: 100
    }],
    reviews: [reviewSchema],
    numberOfReviews:{
        type: Number,
        default: 0,
        required: true
    },

}, { timestamps: true });


const Movie = mongoose.model('Movie', movieSchema);
export default Movie;