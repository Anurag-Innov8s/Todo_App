import mongoose from 'mongoose'
const postSchema = new mongoose.Schema({
  todoBody: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}, {
  timestamps: true,
});

export const Post = mongoose.model("Post", postSchema);

