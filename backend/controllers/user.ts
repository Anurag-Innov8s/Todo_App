import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();
const jwt_secret: string = process.env.JWT_secret as string;
export const signup = async (req: Request, res: Response): Promise<any> => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ error: "Please fill all fields carefully" });
    return;
  }
  try {
    const finduser = await User.findOne({ email: email });
    if (finduser) {
      return res.status(409).json({
        success:false,
        message:"user already exists"
      })
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json({
      success:true,
      message:"User is registered successfully"
    });
  } catch (error: any) {
    res.status(500).json({
      success:false,
      message:error.message
    })
  }
};
export const signin = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(500).json({
      success:false,
      message:"Please fill all the fields carefully"
    })
  }
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(409).json({
        success:false,
        messaage:"User doesn't exists"
      })
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      const token = jwt.sign({ _id: user.id }, jwt_secret);
      return res.status(200).json({
        success:true,
        message:"Logged In successfully",
        token,
      })
    } else {
      return res.status(401).json({
        success:false,
        message:"Incorrect password. Please enter password carefully"
      })
    }
  } catch (error: any) {
    res.status(500).json({
      error: error.message,
    });
  }
};