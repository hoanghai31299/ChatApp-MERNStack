const Message = require("../models/Message");
const getMessage = async (req, res, next) => {
  const { connect } = req.query;
  if (connect) {
    const messages = await Message.find({ connect }).lean();
    res.status(200).json(messages);
    return;
  } else {
    res.status(500).json({ error: "bad request" });
  }
};
const getLastMessage = async (req, res) => {
  const { connect } = req.query;
  if (connect) {
    console.log(connect);
    const lastMessage = await Message.find({ connect })
      .sort({ timestamp: -1 })
      .limit(1);
    if (lastMessage.length > 0) res.status(200).json(lastMessage[0]);
    else {
      res.status(200).json({
        content: "You dont have conect to this people",
        timestamp: Date.now(),
      });
    }
    return;
  } else {
    res.status(500).json({ error: "bad request" });
  }
};
const postMessage = async (req, res, next) => {
  const { sender, receiver, content, type } = req.body;
  if ((sender, receiver)) {
    let connect = sender + "-" + receiver;
    if (sender < receiver) connect = receiver + "-" + sender;
    const timestamp = Date.now();
    const newMessage = await Message.create({
      connect,
      sender,
      content,
      timestamp,
      type,
    });
    res.status(200).json(newMessage);
    return;
  } else {
    res.status(500).json({ error: "bad request" });
  }
};

module.exports = {
  getMessage,
  postMessage,
  getLastMessage,
};
