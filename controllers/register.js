const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

router.get("/", (req, res) => {
  res.render("register", {
    errors: req.flash("registerErrors"),
    userData: req.flash("userData")[0],
  });
});

router.post("/", async (req, res) => {
  const user = new User(req.body);
  user.password = await bcrypt.hash(user.password, 8);
  try {
    await user.save();
    res.status(200).redirect("/");
  } catch (err) {
    const registerErrors = Object.keys(err.errors).map(
      (key) => err.errors[key].message
    );
    req.flash("userData", req.body);
    req.flash("registerErrors", registerErrors);
    res.redirect("/user/create");
  }
});

module.exports = router;
