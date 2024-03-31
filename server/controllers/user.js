import {User} from "../models/user.js";
import  {Post}  from "../models/todo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: "Please fill all fields carefully" });
    return;
  }
  try {
    const finduser = await User.findOne({ email: email });
    if (finduser) {
      return res.status(409).json({
        success: false,
        message: "user already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success: true,
      message: "User is registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      success: false,
      message: "Please fill all the fields carefully",
    });
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(409).json({
        success: false,
        message: "User doesn't exist",
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ _id: user.id }, JWT_SECRET);
      return res.status(200).json({
        success: true,
        message: "Logged In successfully",
        token,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Incorrect password. Please enter password carefully",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged Out successfully",
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const todo = user.todos;

    await user.deleteOne();

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });

    if (todo && todo.length > 0) {
      for (let i = 0; i < todo.length; i++) {
        const td = await Post.findById(todo[i]);
        if (td) {
          await td.deleteOne();
        }
      }
    }
    return res.status(200).json({
      success: true,
      message: "User and their associated Todos are deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

