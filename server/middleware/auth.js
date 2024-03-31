import {User} from "../models/user.js";
import jwt from "jsonwebtoken";


export const isAuthenticated = async (req, res, next) => {
  try {
    let token = req.headers.cookie;
    token = token?.split("=")[1]?.trim();

    if (!token) {
      return res.status(401).json({
        message: "Please login first",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

