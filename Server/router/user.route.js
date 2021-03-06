const express = require("express");
const controller = require("../controllers/user");
const route = express.Router();
const upload = require("../utils/multer");
route.post("/new", upload.single("avatar"), controller.create);
route.get("/get", controller.getById);
route.get("/getAll", controller.getAll);
route.put("/update", controller.update);
route.get("/getByCookie", controller.getByCookie);
module.exports = route;
