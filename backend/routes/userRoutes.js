import express from 'express';
import {createUser, loginUser, logoutUser} from "../controllers/userController.js";
import {authorizeAdmin,authenticate} from "../middlewares/authMiddleeware.js";


const router = express.Router();

router.post('/', createUser);
router.post('/auth',loginUser);
router.post('/logout',logoutUser);



export default router;