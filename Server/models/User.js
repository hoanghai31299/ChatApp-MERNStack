const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: String,
  password: String,
  avatar: String,
  online: String,
});

const User = mongoose.model("User", userSchema, "users");
module.exports = User;
