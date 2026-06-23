import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  username:{
    type:String,
    required:false,
    unique:true,
    sparse: true
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:false,
  },
  credits:{
    type:Number,
    default:200,
  }

},{timestamps:true});

const User = mongoose.model("User",UserSchema);
export default User;