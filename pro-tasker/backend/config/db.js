import mongoose from "mongoose";

// Function to establish a connection to the MongoDB database
const connectDB = async () => {
  try {
    // Connect to MongoDB using the connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
    // Exit the process with error code 1 if connection fails
    process.exit(1);
  }
};

export default connectDB;
