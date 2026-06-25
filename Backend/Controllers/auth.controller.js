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

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username already exists." });
      }
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email already exists." });
      }
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      authMethod: "manual",
    });

    const jwtToken = generateToken(user._id);

    res.cookie("token", jwtToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(201).json(userResponse);
  } catch (error) {
    console.error("SignUp Error:", error);
    return res.status(500).json({ message: "Internal Server Error during SignUp." });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    if (user.authMethod === "google" && !user.password) {
      return res.status(400).json({ 
        message: "This account was created using Google. Please log in using 'Continue with Google'." 
      });
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

    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json(userResponse);
  } catch (error) {
    console.error("SignIn Error:", error);
    return res.status(500).json({ message: "Internal Server Error during SignIn." });
  }
};

export const googleAuthHandler = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required from Google provider." });
    }

    let user = await User.findOne({ email });

    if (user) {
      if (user.authMethod === "manual") {
        user.authMethod = "google";
        await user.save();
        console.log(`Account successfully linked to Google Auth for email: ${email}`);
      }
    } else {
      const fallbackUsername = email.split("@")[0] + Math.floor(100 + Math.random() * 900);

      user = await User.create({
        name,
        username: fallbackUsername,
        email,
        authMethod: "google",
      });
    }

    const token = generateToken(user._id);
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    const userResponse = user.toObject();
    if (userResponse.password) delete userResponse.password;

    return res.status(200).json(userResponse);
  } catch (error) {
    console.error("Google Auth Integration Error:", error);
    return res.status(500).json({ message: error.message });
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