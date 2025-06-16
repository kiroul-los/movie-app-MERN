import express from "express";
import {authorizeAdmin,authenticate} from "../middlewares/authMiddleeware.js";
import {createGenre, deleteGenre, listGenres, readGenre, updateGenre} from "../controllers/genreController.js";

const router=express.Router();

router.post("/", authenticate, authorizeAdmin, createGenre);
router.put('/:id',authenticate,authorizeAdmin,updateGenre);
router.delete('/:id', authenticate, authorizeAdmin, deleteGenre);
router.get("/genres",listGenres);
router.get("/:id",readGenre);

export default router;