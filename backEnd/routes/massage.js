import express from 'express';
import { sendMassage } from '../controllers/massage.controller.js';
import protectRoute from '../middleware/protectRoute.js';
const router = express.Router();

router.post("/send/:id", protectRoute, sendMassage);


export default router;