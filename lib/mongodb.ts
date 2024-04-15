import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const mongodbUri = process.env.MONGO_URI || ""; // Ensure that the variable is defined
    await mongoose.connect(mongodbUri);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

export default connectMongoDB;