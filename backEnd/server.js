import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import connectToMongoDB from './db/connectToMangoDB.js';

const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json());

// Use authentication routes
app.use('/api/auth', authRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Connect to MongoDB and start the server
app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});