const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: {
    type: String,
    requred: [true, "Please provide your username"],
    minlength: 3,
    maxlength: 255,
  },

  password: {
    type: String,
    required: [true, "Please provide your password"],
    minlength: 6,
    maxlength: 255,
  },

  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
  },
});

const User = model("User", userSchema);

module.exports = User;
