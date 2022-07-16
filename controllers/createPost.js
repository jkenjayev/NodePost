const Post = require("../models/Post");
const path = require("path");
const { Router } = require("express");
const router = Router();

router.post("/", async (req, res) => {
  const { image } = req.files;
  image.mv(path.resolve(__dirname, "..", "public/uploads", image.name), (err) => {
    if (err) {
      console.log(err);
    } else {
      Post.create(
        {
          ...req.body,
          author: req.session.userId,
          image: `/uploads/${image.name}`,
        }, 
        (err, data) => {
          if (err) console.log(err);
          res.redirect("/");
        }
      );
    }
  });
});

module.exports = router;
