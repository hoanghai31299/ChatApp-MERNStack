const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const messageSchema = new Schema({
  connect: String,
  content: String,
  type: String,
  sender: String,
  timestamp: Number,
});

const Message = mongoose.model("Message", messageSchema, "messages");
module.exports = Message;
