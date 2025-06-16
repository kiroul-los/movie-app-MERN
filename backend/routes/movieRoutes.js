import express from "express";

import {authorizeAdmin, authenticate} from "../middlewares/authMiddleeware.js";
import {checkId} from "../middlewares/checkId.js";
import {createMovie, getAllMovies, getMovie} from "../controllers/movieController.js";

const router= express.Router();


//public routes

router.get('/all-movies', getAllMovies);
router.get('/movie/:id',getMovie);



//restricted routes

//admin
router.post('/create-movie', authenticate, authorizeAdmin, createMovie);





export default router;