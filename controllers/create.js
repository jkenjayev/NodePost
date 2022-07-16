const { Router } = require("express");
const router = Router();

router.get("/", (req, res) => {
  console.log(req.session.userId);
  res.render("create");
});

module.exports = router;
