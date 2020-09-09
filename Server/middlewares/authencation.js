module.exports.authencation = (req, res, next) => {
  if (!req.signedCookies.userId) {
    res.json({ message: "User not found" });
  }
};
