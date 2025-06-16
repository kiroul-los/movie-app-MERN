import {isValidObjectId} from 'mongoose';

export const checkId=(req, res, next) => {
    if(!isValidObjectId(req.params.id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }
    next();
}