import express from "express";      

import {isAuthenticated} from "../middleware/auth.js"
import { createTodo, deleteTodo, getAllTodo, updateTodo } from "../controllers/todo.js";
const router = express.Router();


router.route("/newtodo").post(isAuthenticated,createTodo);
router.route("/deltodo/:id").delete(isAuthenticated,deleteTodo);
router.route("/updtodo/:id").put(isAuthenticated,updateTodo);
router.route("/todos").get(isAuthenticated,getAllTodo);

export default router;