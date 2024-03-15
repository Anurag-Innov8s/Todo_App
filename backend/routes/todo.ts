import express from "express";      

import authentication from "../middleware/auth";
import { createTodo, deleteTodo, getTodo, updateTodo } from "../controllers/todo";
const router = express.Router();


router.route("/newtodo").post(authentication,createTodo);
router.route("/deltodo/:id").delete(authentication,deleteTodo);
router.route("/updtodo/:id").put(authentication,updateTodo);
router.route("/gettodo/:id").get(authentication,getTodo);

export default router;