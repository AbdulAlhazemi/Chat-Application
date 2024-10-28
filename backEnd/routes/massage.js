import express from 'express';

const router = express.Router();

router.post("/send/:id", sendMassage);


export default router;