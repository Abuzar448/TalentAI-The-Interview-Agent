import User from "../Models/user.model.js";


export const getCurrentUser = async(req,res)=>{
  try {
    const userId = req.user;
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({message:'User not Found !'});
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({message:'Error while getting current user details.',error});
  }
}