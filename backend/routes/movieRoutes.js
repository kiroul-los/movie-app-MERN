import express from "express";

import {authorizeAdmin, authenticate} from "../middlewares/authMiddleeware.js";
import {checkId} from "../middlewares/checkId.js";
import {
    createMovie, deleteComment,
    deleteMovie,
    getAllMovies,
    getMovie, getNewMovies, getRandomMovie, getTopRatedMovies,
    movieReview,
    updateMovie
} from "../controllers/movieController.js";

const router= express.Router();


//public routes

router.get('/all-movies', getAllMovies);
router.get('/movie/:id',getMovie);
router.get("/new-movies",getNewMovies);
router.get("/top-rated-movies",getTopRatedMovies);
router.get("/random-movie",getRandomMovie);

//restricted routes

router.post('/:id/reviews', authenticate, checkId, movieReview);

//admin
router.post('/create-movie', authenticate, authorizeAdmin, createMovie);
router.put('/update-movie', authenticate, authorizeAdmin, updateMovie);
router.delete('/delete-movie/:id', authenticate, authorizeAdmin, deleteMovie);
router.delete("/delete-comment/:id",authenticate,authorizeAdmin,deleteComment);



export default router;