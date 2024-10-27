import express from 'express'
import { signUpUser, loginUser, logoutUser } from '../controllers/controllers.js';

const router = express.Router();

router.post("/api/auth/signup", signUpUser);

router.post("/api/auth/login", loginUser);

router.post("/api/auth/logout", logoutUser);

export default router