const express = require("express");
const app = express();
const edge = require("express-edge");
const fileUploader = require("express-fileupload");
const mongoose = require("mongoose");
const session = require("express-session");
const saveSession = require("connect-mongo");
const flash = require("connect-flash");
const port = process.env.PORT || 5000;

const getPostsRoute = require("./controllers/getPosts");
const getPostByIdRoute = require("./controllers/getPostById");
const createRoute = require("./controllers/create");
const createPostRoute = require("./controllers/createPost");
const registerRoute = require("./controllers/register");
const loginRoute = require("./controllers/login");
const logoutRoute = require("./controllers/logout");

const authMiddleware = require("./middlewares/authMiddleware");
mongoose
  .connect(
    "mongodb+srv://me:123@posts.eajcr.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("connection with DB is OK"))
  .catch((err) => console.log("Error on connection with DB"));

app.use(express.static("public"));
app.use(edge.engine);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUploader());
app.use(flash());
app.set("views", "views");

app.use(
  session({
    secret: "my session",
    resave: false,
    saveUninitialized: true,
    store: saveSession.create({
      mongoUrl:
        "mongodb+srv://me:123@posts.eajcr.mongodb.net/post_sesisons?retryWrites=true&w=majority",
    }),
  })
);

app.use("*", async (req, res, next) => {
  app.locals.validUser = req.session.userId;
  next();
});
app.use("/user/create", registerRoute);
app.use("/", getPostsRoute);
app.use("/posts", getPostByIdRoute);
app.use("/create", authMiddleware, createRoute);
app.use("/posts/create", authMiddleware, createPostRoute);
app.use("/user/login", loginRoute);
app.use("/logout", authMiddleware, logoutRoute);
app.use((req, res) => {
  res.render("404");
});
app.listen(port, () => console.log(`Server is on port ${port}`));
