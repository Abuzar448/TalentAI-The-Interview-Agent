import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { askAI } from "../services/openRouter.service.js";
import User from "../Models/user.model.js";
import Interview from "../Models/interview.model.js";

export const analyzeResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ messsage: "Resume Required." });
    }
    const filePath = req.file.path;
    const fileBuffer = await fs.promises.readFile(filePath);
    const uint8Array = new Uint8Array(fileBuffer);

    const pdf = await pdfjsLib.getDocument({ data: uint8Array }).promise;

    let resumeText = "";
    for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
      const page = await pdf.getPage(pageNumber);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");
      resumeText += pageText + "\n";
    }

    resumeText = resumeText.replace(/\s+/g, " ").trim();

    const messages = [
      {
        role: "system",
        content: `Extract structured data from resume. Return Strictly JSON : 
        {
         "role":"string",
         "experience":"string",
         "projects":["project1","project2"],
         "skills":["skill1","skill2"]
        }`,
      },
      {
        role: "user",
        content: resumeText,
      },
    ];
    const aiResponse = await askAI({ messages });
    const cleanAIResponse = aiResponse.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanAIResponse);

    fs.unlinkSync(req.file.path);

    res.json({
      role: parsed.role,
      experience: parsed.experience,
      projects: parsed.projects,
      skills: parsed.skills,
      resumeText,
    });
  } catch (error) {
    console.log(error);
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: error.message });
  }
};

export const generateQuestions = async (req, res) => {
  try {
    const { resumeText, projects, skills } = req.body;

    const role = String(req.body.role ?? "").trim();
    const experience = String(req.body.experience ?? "").trim();
    const mode = String(req.body.mode ?? "").trim();

    if (!role || !experience || !mode) {
      return res
        .status(400)
        .json({ message: "Role, Experience and Mode are required!" });
    }

    const userId = req.user;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Unauthorized, User Not Found!" });
    }

    if (user.credits < 50) {
      return res
        .status(402)
        .json({
          message: "At least 50 coins required to start the interview!",
        });
    }

    const projectText =
      Array.isArray(projects) && projects.length ? projects.join(", ") : "None";
    const skillsText =
      Array.isArray(skills) && skills.length ? skills.join(", ") : "None";
    const safeResume = resumeText?.trim() || "None";

    const userPrompt = `
    Role: ${role},
    Experience: ${experience},
    InterviewMode: ${mode},
    Projects: ${projectText},
    Skills: ${skillsText},
    Resume: ${safeResume}`;

    const messages = [
      {
        role: "system",
        content: `
        You are a real human interviewer conducting a professional interview.
        Speak in simple, natural English as if you are directly talking to the candidate.
        Generate exactly 5 interview questions.
        Strict Rules:
        - Each question must contain between 15 to 25 words.
        - Each question should be a single complete sentence.
        - Do not number them.
        - Do not add explanations.
        - Do not add extra space before or after the question.
        - One question per line only.
        - Keep language simple and conversational.
        - Questions must feel practical and realistic.

        Difficulty Progression:
        1st Question - Easy
        2nd Question - Easy
        3rd Question - Medium
        4th Question - Medium
        5th Question - Slightly hard

        Make questions based on the candidate's role, experience, mode, projects, skills or resume details.
        `,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ];

    const aiResponse = await askAI({ messages });

    if (!aiResponse || !aiResponse.trim()) {
      console.log("AI returned empty response.");
      return res.status(500).json({ message: "AI returned empty response." });
    }

    const questionsArray = aiResponse
      .split("\n")
      .map((q) => q.trim())
      .filter((q) => q.length > 0)
      .slice(0, 5);

    if (questionsArray.length === 0) {
      console.log("AI failed to generate questions.");
      return res
        .status(500)
        .json({ message: "AI failed to generate questions." });
    }

    user.credits -= 50;
    await user.save();

    const interview = await Interview.create({
      userId: user._id,
      role,
      mode,
      experience,
      resumeText: safeResume,
      questions: questionsArray.map((q, idx) => ({
        question: q,
        difficulty: ["easy", "easy", "medium", "medium", "hard"][idx],
        timeLimit: [60, 60, 90, 90, 120][idx],
      })),
    });

    return res.status(201).json({
      interviewId: interview._id,
      creditsLeft: user.credits,
      userName: user.name,
      questions: interview.questions,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: `Failed to generate questions due to: ${error.message}`,
    });
  }
};

export const submitAnswer = async (req, res) => {
  try {
    const { interviewId, questionIndex, answer, timeTaken } = req.body;
    const interview = await Interview.findById(interviewId);
    const question = interview.questions[questionIndex];

    if (!answer) {
      question.score = 0;
      question.feedback = "You did not submit an answer.";
      question.answer = "";

      await interview.save();
      return res.status(201).json({
        feedback: question.feedback,
      });
    }

    if (timeTaken > question.timeLimit) {
      question.score = 0;
      question.feedback = "Time Limit exceeded.Answer not evolved.";
      question.answer = answer;

      await interview.save();
      return res.status(201).json({
        feedback: question.feedback,
      });
    }

    const messages = [
      {
        Role: "System",
        Content: `
        You are a professional human interviewer evaluating a candidates answer in a real interview.
        Evaluate Naturally and fairly, like a real person would.
        Score the answer in these areas (0 to 10):
        
        1.confidence- Does the answer sounds clear,confident and well organized?
        2.communication- Is the language simple,clear and easy to understand?
        3.correctness- Is the answer accurate, relavent and complete?
        
        Rules:
        -Be realistic and embiased
        -Do not give random high scores
        -If the answer is weak , score low
        -If the answer is strong and detailed, score high
        -Consider clarity, structure, and relavence.

        Calculate:average of confidence,communication, and correctness(rounded to nearest whole number)

        Feedback Rules:
        -write natural human feedback
        -10 to 15 words only 
        -sound like real interview feedback
        -can suggest improvement if needed
        -do not repeat the question
        -do not explain scoring
        keep tone professional and honest.

        Return only valid JSON in this format :
        {
          "confidence":Number,
          "communication":Number,
          "correctness":Number,
          "finalScore":Number,
          "feedback":"Short Human Feedback",
          "improvement":String,
        }
                
        `,
      },
      {
        Role: "User",
        Content: `
        Question:${question.question}
        Answer:${answer}`,
      },
    ];

    const aiResponse = await askAI(messages);

    const parsed = JSON.parse(aiResponse);

    question.answer = answer;
    question.confidence = parsed.confidence;
    question.communication = parsed.communication;
    question.correctness = parsed.correctness;
    question.score = parsed.finalScore;
    question.feedback = parsed.feedback;

    await interview.save();
    return res.status(201).json({ feedback: parsed.feedback });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Answer Submission Failed Error ${error.message}` });
  }
};

export const finishInterview = async (req, res) => {
  try {
    const { interviewId } = req.body;
    const interview = await Interview.findById(interviewId);

    if (!interview) {
      return res.status(400).json({
        message: "Failed to find interview,Interview does not exist!",
      });
    }

    const totalQuestions = interview.questions.length;

    let totalConfidence = 0;
    let totalCorrectness = 0;
    let totalScore = 0;
    let totalCommunication = 0;

    interview.questions.forEach((q) => {
      totalScore += q.score || 0;
      totalCommunication += q.communication || 0;
      totalCorrectness += q.correctness || 0;
      totalConfidence += q.confidence || 0;

      const finalScore = totalQuestions ? totalScore / totalQuestions : 0;

      const averageConfidence = totalQuestions
        ? totalConfidence / totalQuestions
        : 0;

      const averageCommunication = totalQuestions
        ? totalCommunication / totalQuestions
        : 0;

      const averageCorrectness = totalQuestions
        ? totalCorrectness / totalQuestions
        : 0;

      interview.finalScore = finalScore;
      interview.status = "Complete";
    });

    await interview.save();

    return res.status(200).json({
      finalScore: Number(finalScore.toFixed(1)),
      confidence: Number(averageConfidence.toFixed(1)),
      communication: Number(averageCommunication.toFixed(1)),
      correctness: Number(averageCorrectness.toFixed(1)),
      QuestionWiseScore: interview.questions.map((q) => ({
        question: q.question,
        score: q.score || 0,
        feedback: q.feedback || 0,
        confidence: q.confidence || 0,
        communication: q.communication || 0,
        correctness: q.correctness || 0,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      message: `Failed to finish interview due to : ${error.message}`,
    });
  }
};