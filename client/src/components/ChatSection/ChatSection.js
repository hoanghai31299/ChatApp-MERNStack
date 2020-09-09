import React, { useState, useEffect } from "react";
import "./ChatSection.css";
import SideBar from "./SideBar/SideBar";
import Chat from "./Chat/Chat";
import axios from "../../axios.js";
function ChatSection() {
  const [user, setUser] = useState("");
  const [friends, setFriends] = useState([]);
  const [connect, setConnect] = useState();
  useEffect(() => {
    axios
      .get("/user/getByCookie", {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      })
      .then((res) => setUser(res.data));
    axios.get("/user/getAll").then((res) => setFriends(res.data));
  }, []);
  const onFriendClick = (cnt) => {
    return () => {
      setConnect(cnt);
    };
  };

  return (
    <div className="chat">
      <SideBar user={user} friends={friends} onFriendClick={onFriendClick} />
      {connect && <Chat user={user} connect={connect} />}
      {!connect && <div>Choose person to talk with</div>}
    </div>
  );
}

export default ChatSection;
