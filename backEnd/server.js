import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import massageRoute from './routes/massage.routes.js';
import userRoutes from './routes/user.routes.js';

import connectToMongoDB from './db/connectToMangoDB.js';

const app = express();
dotenv.config();


//const __dirname = path.resolve();
const PORT = process.env.PORT || 4000;


// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/massages', massageRoute);
app.use('/api/users', userRoutes);


//app.use(express.static(path.join(__dirname, "/frontend/dist")));


// Root endpoint
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


// Connect to MongoDB and start the server
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});