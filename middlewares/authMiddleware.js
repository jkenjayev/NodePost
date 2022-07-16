const User = require("../models/User");
module.exports = async (req, res, next) => {
  console.log("auth", req.session.userId);
  const user = await User.findById(req.session.userId);
  if (!user) {
    return res.redirect("/");
  } else {
    next();
  }
};
