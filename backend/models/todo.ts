import mongoose, { Schema, Types } from "mongoose";
interface IUser {
  posts: IPost[] | Types.ObjectId[];
}
interface IPost {
  body: string;
  description: string;
}
const postSchema: Schema<IPost> = new mongoose.Schema({
  body: {
    type: String,
    required: true,
  },
  description:{
    type: String,
    required:true,
  }
},
{
    timestamps:true
  }
);
export const Post = mongoose.model<IPost>("POST", postSchema);
