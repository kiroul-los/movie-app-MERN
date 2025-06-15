import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import asyncHandler from './asyncHandler.js';

export const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    token=req.cookies.jwt

    if (token) {
        try {
            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Find the user by ID
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }else{
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});


//check the user is admin
export const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied, admin only' });
    }
};