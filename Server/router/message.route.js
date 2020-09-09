const express = require("express");
const controller = require("../controllers/message");
const route = express.Router();

route.post("/new", controller.postMessage);
route.get("/get", controller.getMessage);
route.get("/get/lastmessage", controller.getLastMessage);
module.exports = route;
