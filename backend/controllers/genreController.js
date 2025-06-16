import Genre from "../models/Genre.js";
import asyncHandler from "../middlewares/asyncHandler.js";

// Function to create a new genre
export const createGenre = asyncHandler(async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ message: "Please provide a genre name" });
    }

    try {
        const existingGenre = await Genre.findOne({ name });
        if (existingGenre) {
            return res.status(400).json({ message: "Genre already exists" });
        }

        const newGenre = await Genre.create({ name });
        res.status(201).json({
            message: "Genre created successfully",
            genre: newGenre,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creating genre" });
    }
});

export const updateGenre = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;

    if (!name) {
        return res.status(400).json({message: "Please provide a genre name"});}
        try {
            const genre = await Genre.findById(id);
            if (!genre) {
                return res.status(404).json({message: "Genre not found"});
            }

            genre.name = name;
            const updatedGenre = await genre.save();
            res.status(200).json({
                message: "Genre updated successfully",
                genre: updatedGenre,
            });
        } catch(error) {
            res.status(500).json({message: "Error updating genre"});
        }
})

export const deleteGenre = asyncHandler(async (req, res) => {
    const {id} = req.params;

    try {
        const genre = await Genre.findById(id);
        if (!genre) {
            return res.status(404).json({message: "Genre not found"});
        }

        await genre.remove();
        res.status(200).json({message: "Genre deleted successfully"});
    } catch (error) {
        res.status(500).json({message: "Error deleting genre"});
    }
})


export const listGenres = asyncHandler(async (req, res) => {
    try {
        const genres = await Genre.find({});
        if(!genres || genres.length === 0) {
            return res.status(404).json({ message: "No genres found" });
        }
        res.status(200).json({
            message: "Genres retrieved successfully",
            genres,
        });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving genres" });
    }
})

export const readGenre= asyncHandler(async (req, res) => {
    const {id} = req.params;

        try {
            const genre = await Genre.findById(id);
            if (!genre) {
                return res.status(404).json({message: "Genre not found"});
            }
            res.status(200).json({
                message: "Genre retrieved successfully",
                genre,
            });
        }
        catch (error) {
            res.status(500).json({message: "Error retrieving genre"});
        }
    });