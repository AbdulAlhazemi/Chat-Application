import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import massageRoute from './routes/massage.routes.js';
//import userRoutes from './routes/user.routes.js';


import connectToMongoDB from './db/connectToMangoDB.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);
app.use('/api/massages', massageRoute);
//app.use('/api/users', userRoute);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Connect to MongoDB and start the server
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});