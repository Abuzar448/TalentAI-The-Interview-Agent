import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/DB.js';
import authRouter from './Routes/auth.routes.js';


dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth/',authRouter);

app.get('/',(req,res)=>{
  res.send('Welcome to backend server.');
})
const PORT = process.env.PORT;
connectDB();
app.listen(PORT,()=>{
  console.log(`Server is running on ${PORT} port.`)
})