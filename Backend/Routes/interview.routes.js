import express from 'express';
import { isAuth } from '../middleware/isAuth.js';
import { analyzeResume, finishInterview, generateQuestions, submitAnswer } from '../Controllers/interview.controller.js';
import { upload } from '../middleware/multer.js';


const interviewRouter = express.Router();

interviewRouter.post('/resume',isAuth, upload.single('resume'),analyzeResume);
interviewRouter.post('/generate-quesions',isAuth,generateQuestions);
interviewRouter.post('/submit-answer',isAuth,submitAnswer);
interviewRouter.post('/finish',isAuth,finishInterview);

export default interviewRouter;