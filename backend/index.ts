import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
require('dotenv').config();

import userRoutes from "./routes/user";
// import createPost from "./routes/createPost";
const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(userRoutes);
// app.use(createPost); 
mongoose.connect(process.env.Mongo_url as string, {
  dbName: "TODO_app",
});
console.log("Database Connected");
app.listen(process.env.port as string, () => {
  console.log(`Server started at port ${process.env.port}`);
}); 