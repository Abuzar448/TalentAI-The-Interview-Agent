import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/DB.js';


dotenv.config();

const app = express();
app.get('/',(req,res)=>{
  res.send('Welcome to backend server.');
})
const PORT = process.env.PORT;
connectDB();
app.listen(PORT,()=>{
  console.log(`Server is running on ${PORT} port.`)
})