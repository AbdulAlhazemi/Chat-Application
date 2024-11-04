import express from 'express';
import {signUpUser} from '../controllers/auth.controllers.js';
import {loginUser} from '../controllers/auth.controllers.js';
import {logoutUser} from '../controllers/auth.controllers.js';

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;