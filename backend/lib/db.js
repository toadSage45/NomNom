import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const mongo_uri = process.env.MONGODB_URI;
const connectDB = async () => {
  try{
    const connection = await mongoose.connect(mongo_uri);
    console.log(`MongoDB connected ${connection.connection.host}`);
  }catch(err){
    console.log(`MongoDB connection error ${err}`);
  }
}

export default connectDB;