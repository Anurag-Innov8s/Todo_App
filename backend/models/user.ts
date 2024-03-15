import mongoose from "mongoose"
interface IUser {
  profilePic: string;
  name: string;
  email: string;
  password: string;
  todos: mongoose.Types.ObjectId[];
}
const userSchema = new mongoose.Schema({
  profilePic:{
    type:String,
    default:""
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  todos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "posts", 
    },
  ],
});
const User = mongoose.model<IUser>("User", userSchema);
export default User;