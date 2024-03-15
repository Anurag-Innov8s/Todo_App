import mongoose, { Schema, Types } from "mongoose";
interface IUser {
  posts: IPost[] | Types.ObjectId[];
}
interface IPost {
  todoBody: string;
  description: string;
  user: Types.ObjectId | IUser;
}
const postSchema: Schema<IPost> = new mongoose.Schema({
  todoBody: {
    type: String,
    required:true,
  },
  description:{
    type: String,
    required:true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User", 
  },
},
{
    timestamps:true
  }
);
export const Post = mongoose.model<IPost>("POST", postSchema);
