import express from 'express';
import {
    createUser,
    getAllUsers,
    getCurrentUserProfile,
    loginUser,
    logoutUser, updateCurrentUserProfile
} from "../controllers/userController.js";
import {authorizeAdmin,authenticate} from "../middlewares/authMiddleeware.js";


const router = express.Router();

router.get('/', authenticate, authorizeAdmin, getAllUsers);
router.post('/', createUser);
router.post('/auth',loginUser);
router.post('/logout',logoutUser);

router.get('/profile', authenticate,getCurrentUserProfile);
router.put('/profile',updateCurrentUserProfile);


export default router;