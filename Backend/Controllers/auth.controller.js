import generateToken from "../config/token.js";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(400).json({
        message: "All fields (name, username, email, password) are required.",
      });
    }

    const isUsernameAlreadyExist = await User.findOne({ username });
    if (isUsernameAlreadyExist) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const isEmailAlreadyExist = await User.findOne({ email });
    if (isEmailAlreadyExist) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const jwtToken = generateToken(user._id);

    res.cookie("token", jwtToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      secure:false,
      sameSite: "Strict",
    });

    return res.status(201).json(user);
  } catch (error) {
    console.error("SignUp Error:", error);
    return res.status(500).json({ message: "Internal Server Error during SignUp." });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required.",
      });
    }
    if(password.length<6){
      return res.status(400).json({message:"Password Must be Atleast 6 characters long ."})
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    const jwtToken = generateToken(user._id);

    res.cookie("token", jwtToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });


    return res.status(200).json(user);
  } catch (error) {
    console.error("SignIn Error:", error);
    return res.status(500).json({ message: "Internal Server Error during SignIn." });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Signed out successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Error during SignOut process." });
  }
};