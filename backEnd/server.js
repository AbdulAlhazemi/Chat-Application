import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import authRoutes from './routes/auth.routes.js';
import massageRoutes from './routes/massage.routes.js';
import userRoutes from './routes/user.routes.js';
import { app, server } from "./socket/socket.js";
import connectToMongoDB from './db/connectToMangoDB.js';


dotenv.config();


const __dirname = path.resolve();
const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(express.json());
app.use(cookieParser());

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/massages', massageRoutes);
app.use('/api/users', userRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../frontend/index.html")));

// Root endpoint for SPA
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Connect to MongoDB and start the server
server.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server running on port ${PORT}`);
});