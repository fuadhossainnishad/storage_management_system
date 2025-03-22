import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const db_url = process.env.MONGODB_URL as string;
const dbconnection = async () => {
  try {
    await mongoose.connect(db_url);
    console.log("Databse connected");
    
  } catch (error) {
    console.log("Databse not connected");
    process.exit(1);
  }
};
export default dbconnection;
