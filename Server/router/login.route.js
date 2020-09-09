const express = require("express");
const controller = require("../controllers/login");
const route = express.Router();

route.get("/login", controller.login);

module.exports = route;
