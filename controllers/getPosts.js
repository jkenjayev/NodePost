const Post = require("../models/Post");
const User = require("../models/User");
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  const posts = await Post.find().populate("author", "username");
  res.render("index", { posts });
});

module.exports = router;
