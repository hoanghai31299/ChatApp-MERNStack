import React from "react";
import "./Message.css";
function msToTime(duration) {
  return new Date(duration).toString().slice(15, 21);
}
function Message({ connect, mine, text, timestamp }) {
  const time = msToTime(timestamp);
  return (
    <div className={`message${mine ? " mine" : ""}`}>
      {!mine && <h3>{connect.name}</h3>}
      <span className="message__content">{text}</span>
      <span className="message__time">{time}</span>
    </div>
  );
}

export default Message;
