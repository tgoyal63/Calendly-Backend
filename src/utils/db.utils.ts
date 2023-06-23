import mongoose from "mongoose";

const connectDB = async () => {
  const dbUri = process.env.MONGODB_URI;
  try {
    await mongoose.connect(dbUri as string);
    console.log("MongoDB connection established successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
