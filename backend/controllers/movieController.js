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


export const updateMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, image, year, genre, description, cast } = req.body;

        if (!name || !image || !year || !genre || !description || !cast) {
        return res.status(400).json({ message: "Please provide all required movie fields." });
}
    try {
        const updatedMovie = await Movie.findByIdAndUpdate(
            id,
            { name, image, year, genre, description, cast },
            { new: true, runValidators: true }
        );

            if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({
            message: "Movie updated successfully",
            updatedMovie
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating movie" });
    }
});


export const movieReview= asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {comment, rating} = req.body;

    if (!comment || !rating) {
        return res.status(400).json({message: "Please provide both comment and rating."});
    }

    try {
        const movie = await Movie.findById(id);

        if (!movie) {
            return res.status(404).json({message: "Movie not found"});
        }

        if (movie) {
            // Check if the user has already reviewed this movie
            const existingReview = movie.reviews.find(review => review.user.toString() === req.user._id.toString());
            if (existingReview) {
                return res.status(400).json({message: "You have already reviewed this movie."});
            }

            const review = {
                user: req.user._id,
                comment,
                rating
            };

            movie.reviews.push(review);
            movie.numberOfReviews = movie.reviews.length;
            movie.rating = movie.reviews.reduce((acc, review) => acc + review.rating, 0) / movie.reviews.length;
            await movie.save();
            return res.status(201).json({
                message: "Review added successfully",
                review
            });
        }

    } catch (error) {
        return res.status(500).json({message: "Error adding review"});
    }
});


export const deleteMovie = asyncHandler(async (req, res) => {
    const { id } = req.params;

        try {
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }
        res.status(200).json({
            message: "Movie deleted successfully",
            deletedMovie
        });
    } catch (error) {
             res.status(500).json({message:"Error Deleting Movie"})
        }
})


export const deleteComment=asyncHandler(async(req,res)=>{

    try{
    const {movieId,reviewId}=req.body;
        const movie=await Movie.findById(movieId);
        if(!movie){
            return res.status(404).json({message:"movie not found"})
        }

        const reviewIndex = movie.reviews.findIndex(review => review._id.toString() === reviewId);

        if(reviewIndex === -1) {
            return res.status(404).json({ message: "Comment not found" });
    }
        movie.reviews.splice(reviewIndex, 1);
        movie.numberOfReviews = movie.reviews.length;
        movie.rating = movie.reviews.reduce((acc, review) => acc + review.rating, 0) / movie.reviews.length || 0;
        await movie.save();

            res.status(200).json({
            message: "Comment deleted successfully",
            reviews: movie.reviews,
            numberOfReviews: movie.numberOfReviews,
            rating: movie.rating
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment" });
    }
})


export const getNewMovies= asyncHandler(async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 }).limit(10);
        res.status(200).json({
            message: "New movies fetched successfully",
            movies
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching new movies" });
    }
});


export const getTopRatedMovies= asyncHandler(async (req, res) => {
    try {
        const movies = await Movie.find().sort({ rating: -1 }).limit(10);
        res.status(200).json({
            message: "Top rated movies fetched successfully",
            movies
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching top rated movies" });
    }
});

export const getRandomMovie = asyncHandler(async (req, res) => {
    try {
        const count = await Movie.countDocuments();
        const randomIndex = Math.floor(Math.random() * count);
        const randomMovie = await Movie.findOne().skip(randomIndex);

        if (!randomMovie) {
            return res.status(404).json({ message: "No movies found" });
        }

        res.status(200).json({
            message: "Random movie fetched successfully",
            movie: randomMovie
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching random movie" });
    }
});


