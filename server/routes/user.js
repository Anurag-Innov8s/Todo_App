import express from "express";      
import { signup,signin, deleteMe } from "../controllers/user.js";
import {isAuthenticated} from "../middleware/auth.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.route("/deleteMe").delete(isAuthenticated,deleteMe)
export default router;