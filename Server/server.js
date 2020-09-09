//set up eviroment variable
require("dotenv").config();
//import package
const express = require("express");
const { connectDB, mongoose } = require("./models");
const loginRoute = require("./router/login.route");
const messageRoute = require("./router/message.route");
const userRoute = require("./router/user.route");
const cookieParser = require("cookie-parser");
const body = require("body-parser");
const Pusher = require("pusher");
const cors = require("cors");

const headers = {
  origin: "http://localhost:3000",
  credentials: true,
};

//config app
const app = express();
const port = process.env.PORT || 3002;
const pusher = new Pusher({
  appId: "1067682",
  key: "cbfd99ae796283a36667",
  secret: "c860730c3e0208c2ab7f",
  cluster: "ap1",
  useTLS: true,
});
//database set up
connectDB();
const db = mongoose.connection;
db.once("open", () => {
  console.log("connect...");
  const msgCollection = db.collection("messages");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    if (change.operationType === "insert") {
      const messageDetail = change.fullDocument;
      console.log("channel:", messageDetail);
      pusher.trigger(messageDetail.connect, "inserted", {
        ...messageDetail,
      });
    }
  });
});
//middleware
app.use(cors(headers));
app.use(express.json({ limit: "50mb" })); // for parsing application/json
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(express.urlencoded({ limit: "50mb", extended: true })); // for parsing application/x-www-form-urlencoded
//router
app.get("/", (req, res) => {
  res.status(200).send("hello world");
});
app.use("/message", messageRoute);
app.use("/login", loginRoute);
app.use("/user/", userRoute);

//listen
app.listen(port, () => {
  console.log(`app is listening to localhost:${port}`);
});
