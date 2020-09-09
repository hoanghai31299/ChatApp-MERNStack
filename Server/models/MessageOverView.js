const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageOverViewSchema = new Schema({
  connect: String,
  lastMes: String,
  timestamp: String,
});

const Detail = mongoose.model(
  "DetailMessage",
  MessageOverViewSchema,
  "detailmessages"
);
module.exports = Detail;
