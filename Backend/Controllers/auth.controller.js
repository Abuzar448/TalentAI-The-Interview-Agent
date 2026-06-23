import token from "../config/token.js";
import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name && !username && !email && !password) {
      return res.status(400).json({
        message:
          "All details are required such as name, username, email and password",
      });
    }
    const isUsernameAlreadyExist = await User.findOne({ username });
    if (isUsernameAlreadyExist) {
      return res.status(400).json({ message: "Username already exist" });
    }
    const isEmailAlreadyExist = await User.findOne({ email });
    if (isEmailAlreadyExist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    const token = token(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error in SignUp Process." });
  }
};

export const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username && !password) {
      return res.status(400).json({
        message:
          "All details are required such as UserName and Password to SignIn",
      });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: `Password Doesn't match` });
    }

    const token = token(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      httpOnly: true,
      maxAge: 10 * 365 * 24 * 60 * 60 * 1000,
      secure: false,
      sameSite: "Strict",
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Error in SignIn Process." });
  }
};

export const signOut = async(req,res)=>{
  try {
    res.clearCookie('token');
    return res.status(200).json({ message: "sign out successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error in SignOut Process." });
  }
}
