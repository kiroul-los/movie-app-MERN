import Movie from "../models/Movie.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getAllMovies= asyncHandler(async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(
            {
             message: "Movies fetched successfully",
                movies
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Error fetching movies" });
    }
});

export const getMovie=asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).json({message: "Movie not found"});
        }
        res.status(200).json({
            message: "Movie fetched successfully",
            movie
        });
    } catch (error) {
        res.status(500).json({message: "Error fetching movie"});
    }
});


export const createMovie = asyncHandler(async (req, res) => {
    // const { name, image, year, genre, description, cast } = req.body;
    const { name, image, year, genre, description, cast } = req.body;

    if (!name || !image || !year || !genre || !description || !cast) {
        return res.status(400).json({ message: "Please provide all required movie fields." });
    }
        try {
        const newMovie = new Movie(req.body);
        const savedMovie=await newMovie.save();
        res.status(201).json({
            message: "Movie created successfully",
            savedMovie
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating movie" });
        }
    });