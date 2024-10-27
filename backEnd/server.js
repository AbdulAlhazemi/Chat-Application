import express from 'express';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js'
import connectToMongoDB from './db/connectToMangoDB.js'


const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(express.json());


app.get('/', (req, res) => {
  //root endpoint http://localhost:${PORT}
  res.send('hello world')
})

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});