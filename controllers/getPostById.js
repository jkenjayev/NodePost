const Post = require("../models/Post");
const { Router } = require("express");
const router = Router();

router.get("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id).populate("author", "username");
  res.render("post", { post });
});

module.exports = router;