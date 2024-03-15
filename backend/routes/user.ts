import express from "express";      
import { signup,signin, deleteMe } from "../controllers/user";
import authentication from "../middleware/auth";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.route("/deleteMe").delete(authentication,deleteMe)
export default router;