import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variable
    const mongoURI = process.env.MONGO_URI!;
    
    // Establish MongoDB connection
    await mongoose.connect(mongoURI);

    console.log('MongoDB connected successfully');
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error connecting to MongoDB:', error.message);
    } else {
      console.error('Error connecting to MongoDB:', error);
    }
    process.exit(1); // Exit the process if the connection fails
  }
};

export default connectDB;
