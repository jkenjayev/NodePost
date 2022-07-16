const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const result = await bcrypt.compare(password, user.password);
  if (result) {
    req.session.userId = user._id;
    res.redirect("/");
  } else {
    res.redirect("/user/login");
  }
});

module.exports = router;
