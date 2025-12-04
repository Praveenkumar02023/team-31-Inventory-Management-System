import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/utils/db.js';
import authRoutes from './src/routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

const start = async () => {
    try {
        await connectDB();
        // mount auth routes
        app.use('/api/auth', authRoutes);

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch (err) {
        console.error('Startup failed:', err);
        process.exit(1);
    }
};

start();
