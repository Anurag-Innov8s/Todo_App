import express from "express";      

import authentication from "../middleware/auth";
import { createTodo, deleteTodo, getAllTodo, getTodo, updateTodo } from "../controllers/todo";
const router = express.Router();


router.route("/newtodo").post(authentication,createTodo);
router.route("/deltodo/:id").delete(authentication,deleteTodo);
router.route("/updtodo/:id").put(authentication,updateTodo);
router.route("/todos").get(authentication,getAllTodo);

export default router;