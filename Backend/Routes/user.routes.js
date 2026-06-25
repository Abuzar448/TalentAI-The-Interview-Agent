import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { getCurrentUser } from '../Controllers/user.controllers.js';
const userRouter = express.Router();

userRouter.get('/currentUser',isAuth,getCurrentUser);

export default userRouter;