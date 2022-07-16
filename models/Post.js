const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  title: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  content: {
    type: String,
    reuired: true,
  },
  image: {
    type: String,
  },
});
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
