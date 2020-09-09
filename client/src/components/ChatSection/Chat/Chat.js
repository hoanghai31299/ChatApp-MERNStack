import React, { useState, useEffect, useRef } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import Message from "../Message/Message";
import {
  Call,
  Videocam,
  MoreHoriz,
  Send,
  KeyboardVoice,
  Image,
} from "@material-ui/icons";
import "./Chat.css";
import Pusher from "pusher-js";
import axios from "../../../axios";
const getConnectString = (a, b) => {
  let string = "";
  if (a > b) string = a + "-" + b;
  else string = b + "-" + a;
  return string;
};
function Chat({ user, connect }) {
  const [messages, setMessages] = useState(null);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);
  const handleSendMessage = (e) => {
    e.preventDefault();
    axios
      .post(`/message/new`, {
        sender: user._id,
        receiver: connect._id,
        content: input,
        type: "text",
      })
      .then((res) => console.log(res.data))
      .catch(() => console.log("Have some loi~"));
    setInput("");
  };

  useEffect(() => {
    const connectString = getConnectString(user._id, connect._id);
    axios
      .get(`/message/get?connect=${connectString}`)
      .then((res) => {
        setMessages(res.data);
      })
      .catch(() => console.log("Can’t access response. Blocked by browser?"));
  }, [connect, user._id]);
  useEffect(() => {
    const pusher = new Pusher("cbfd99ae796283a36667", {
      cluster: "ap1",
    });
    const channel = pusher.subscribe(getConnectString(user._id, connect._id));
    console.log("channel:", getConnectString(user._id, connect._id));
    channel.bind("inserted", function (data) {
      console.log("triggered");
      setMessages([...messages, data]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [connect, messages, user._id]);
  return (
    <div className="chat__container">
      <div>{user.name}</div>
      <div className="chat__header">
        <Avatar src={connect.avatar} />
        <div className="chat__header__info">
          <span>{connect.name}</span>
          <span>{connect.online}</span>
        </div>
        <div className="chat__header__action">
          <IconButton>
            <Call />
          </IconButton>
          <IconButton>
            <Videocam />
          </IconButton>
          <IconButton>
            <MoreHoriz />
          </IconButton>
        </div>
      </div>
      <div className="chat__window">
        {messages &&
          messages.map((message, index) => {
            return (
              <Message
                key={message._id}
                connect={connect}
                timestamp={message.timestamp}
                text={message.content}
                mine={message.sender === user._id}
              />
            );
          })}
        <div ref={messagesEndRef} />
        {!messages && <div>Loading....</div>}
      </div>
      <div className="chat__footer">
        <form onSubmit={handleSendMessage}>
          <IconButton>
            <KeyboardVoice />
          </IconButton>
          <IconButton>
            <Image />
          </IconButton>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="Type new message here"
          />
          <IconButton>
            <Send />
          </IconButton>
        </form>
      </div>
    </div>
  );
}

export default Chat;
