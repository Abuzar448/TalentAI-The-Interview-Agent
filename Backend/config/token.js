import jwt from 'jsonwebtoken';

const token = (userId)=>{
  try {
   const token = jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:'7d'});
   return token;
  } catch (error) {
    return {status: 500, message: `Token generation failed due to ${error}`};
  }
}

export default token;