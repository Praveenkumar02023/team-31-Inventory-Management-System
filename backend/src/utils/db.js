import mongoose from 'mongoose';

const connectDB = async (mongoUri) => {
    const uri = mongoUri || process.env.MONGO_URI || 'mongodb://localhost:27017/inventory_db';
    try {
        
        await mongoose.connect(uri, {
           
        });
        console.log('Connected to MongoDB (db util)');
    } catch (err) {
        console.error('MongoDB connection error (db util):', err);
        throw err;
    }
};

export default connectDB;
