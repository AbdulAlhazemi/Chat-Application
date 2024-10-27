import express from 'express'; 
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js'

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  //root endpoint http://localhost:${PORT}
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});