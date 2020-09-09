const User = require("../models/User");
module.exports.login = async (req, res, next) => {
  const { name, password } = req.query;
  const user = await User.findOne({ name: name }).lean();
  if (!user) {
    res.json({
      message: "User not found",
    });
    return;
  }
  console.log(user);
  if (!user.password === password) {
    res.json({
      message: "Wrong password",
    });
    return;
  }
  res
    .cookie("userId", user._id, {
      signed: true,
    })
    .status(200)
    .json({ message: "success" });
};
