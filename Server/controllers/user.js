const User = require("../models/User");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");
const cloud = require("cloudinary");

const uploader = async (path) => await cloudinary.uploads(path, "ChatApp");
module.exports.getByCookie = async (req, res) => {
  const id = req.signedCookies.userId;
  const user = await User.findById(id).lean();
  if (user) {
    res.json(user);
  } else res.status(404).json({ message: "user not found" });
};
module.exports.create = async (req, res, next) => {
  const { name, password } = req.body;
  try {
    if (name && password && req.file) {
      const user = await User.findOne({ name }).lean();
      if (user) {
        res.json({ message: "user name has been taken" });
        return;
      }
      const file = req.file;
      const { path } = file;
      const newPath = await uploader(path);
      fs.unlinkSync(path);

      const newUser = await User.create({
        name,
        password,
        avatar: newPath.url,
        online: "online",
      });
      res.status(200).json(newUser);
      return;
    } else res.status(500).json({ err: "bad request" });
  } catch (e) {
    next(e);
  }
};

module.exports.getAll = async (req, res) => {
  const users = await User.find().select("-password").lean();
  res.json(users);
};
module.exports.getById = async (req, res) => {
  const { id } = req.query;
  if (req.query) {
    const user = await User.findById(id).lean();
    if (user) {
      const { name, avatar, _id, online } = user;
      res.status(200).json({
        _id,
        name,
        avatar,
        online,
      });
      return;
    } else res.status(404).json({ err: "user not found" });
  } else {
    res.status(500).json({ err: "bad request" });
  }
};
module.exports.update = async (req, res, next) => {
  const { id, name, password, avatar } = req.body;
  const user = await User.updateOne(
    { id },
    {
      _id: id,
      name,
      password,
      avatar,
    }
  );
};
