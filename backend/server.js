import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/utils/db.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});
