import jwt from "jsonwebtoken";
export const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(400).json({ message: "UnAuthorized !" });
    }
    const userId = jwt.verify(token, process.env.JWT_SECRET);
    if (!userId) {
      return res.status(400).json({ message: "Invalid token." });
    }
    req.user = userId.id;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Error while checking is user loged in or not ?", error });
  }
};
