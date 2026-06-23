import express from 'express';
import { signIn, signOut, signUp } from '../Controllers/auth.controller.js';
const router = express.Router();

router.post('/signUp',signUp);
router.post('/signIn',signIn);
router.get('/signOut',signOut);

export default router;