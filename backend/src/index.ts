import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupDB } from './db/setup';
import apiRoutes from './routes/api';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize DB
setupDB();

// Routes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`ASTRAX Backend Core Online on port ${PORT}`);
});
