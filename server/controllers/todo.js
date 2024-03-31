import {User} from "../models/user.js";
import { Post } from "../models/todo.js";
import dotenv from "dotenv";
dotenv.config();

export const createTodo = async (req, res) => {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTodo = async (req, res) => {
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Post.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    todo.todoBody = req.body.todoBody;
    todo.description = req.body.description;
    await todo.save();
    return res.status(200).json({
      success: true,
      message: "Todo Updated successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTodo = async (req, res) => {
  try {
    const todo = await Post.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Todo found successfully",
      todo,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllTodo = async (req, res) => {
  try {
    const todo = await Post.find();
    return res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

