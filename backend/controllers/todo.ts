import { Request, Response } from "express";
import User from "../models/user";
import { Post } from "../models/todo";
import * as dotenv from "dotenv";
dotenv.config();

export const createTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const newTodoData = {
      todoBody: req.body.todoBody,
      description: req.body.description,
    };
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const todo = await Post.create(newTodoData);
    await User.findByIdAndUpdate(
      req.user._id,
      { $push: { todos: todo._id } },
      { new: true }
    );
    return res.status(201).json({
      success: true,
      message: "Todo created",
      todo,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const todo = await Post.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    await todo.deleteOne();

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.todos = user.todos.filter(
      (todoId) => todoId.toString() !== req.params.id
    );

    await user.save();

    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const todo = await Post.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    todo.todoBody=req.body.todoBody;
    todo.description=req.body.description;
    await todo.save();
    return res.status(200).json({
      success:true,
      message:"Todo Updated successfully",
      todo
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const getTodo = async (req: Request, res: Response): Promise<any> => {
  try {
    const todo = await Post.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      success:true,
      message:"Todo found successfully",
      todo
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


