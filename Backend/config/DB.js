import mongoose from "mongoose";

const connectDB = async ()=>{
  try {
    const mongoDBURL = process.env.MONGODB_URL;
    const isConnected = await mongoose.connect(mongoDBURL);
    if(isConnected){
      console.log('Database Connected Successfully .')
    }
  } catch (error) {
    console.log('Error while connecting to database');
  }
}

export default connectDB;