import React, { useEffect, useState } from "react";
import "./SideBarPerson.css";
import { Avatar } from "@material-ui/core";
import axios from "../../../axios";
const getConnectString = (a, b) => {
  let string = "";
  if (a > b) string = a + "-" + b;
  else string = b + "-" + a;
  return string;
};
function msToTime(duration) {
  return new Date(duration).toString().slice(15, 21);
}
function SideBarPerson({ user, friend, onFriendClick }) {
  const [last, setLast] = useState({});
  useEffect(() => {
    const connect = getConnectString(friend._id, user._id);
    console.log(connect);
    axios
      .get("/message/get/lastmessage", {
        params: {
          connect,
        },
      })
      .then((res) => {
        setLast(res.data);
        console.log(res.data);
      });
  }, [user, friend._id]);
  return (
    <div className="sidebar_person" onClick={onFriendClick(friend)}>
      <Avatar src={friend.avatar} />
      <div className="person__info">
        <span>{friend.name}</span>
        {last && <span>{last.content}</span>}
        {!last && <span>Loading</span>}
      </div>
      {last && <div className="person__time">{msToTime(last.timestamp)}</div>}
    </div>
  );
}

export default SideBarPerson;
