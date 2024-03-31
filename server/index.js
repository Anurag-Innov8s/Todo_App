import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";

import userRoutes from "./routes/user.js";
import createTodo from "./routes/todo.js";
config();
const app = express();
app.use(cors()); 
app.use(express.json());
app.use(userRoutes);
app.use(createTodo);

mongoose.connect(process.env.MONGO_URI, {
  dbName: "TODO_app",
});
console.log("Database Connected");

app.listen(process.env.PORT, () => {
  console.log(`Server started at port ${process.env.PORT}`);
});
