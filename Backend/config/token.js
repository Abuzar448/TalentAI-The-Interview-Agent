import jwt from 'jsonwebtoken';

const token = async(userId)=>{
  try {
   const token = await jwt.sign({id:userId},process.env.JWT_SECRET);
   return token;
  } catch (error) {
    return {status: 500, message: `Token generation failed due to ${error}`};
  }
}

export default token;