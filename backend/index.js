import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import * as path from "path";
import connectDB from './config/db.js';
import userRoutes from "./routes/userRoutes.js";
import genreRoutes from "./routes/genreRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";


// Load environment variables from .env file
    dotenv.config();

// Connect to MongoDB
    connectDB();
    // Create an Express application
    const app = express();

// Middleware to parse JSON and cookies
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));

    const PORT = process.env.PORT || 3000;

    app.use('/api/v1/users',userRoutes);
    app.use('/api/v1/genres',genreRoutes);
    app.use('/api/v1/movies',movieRoutes);


    app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));

