import React from "react";
import "./SideBar.css";
import { Search } from "@material-ui/icons";
import SideBarPerson from "../SideBarPerson/SideBarPerson";
function SideBar({ user, friends, onFriendClick }) {
  return (
    <div className="chat__sidebar">
      <div className="sidebar__search">
        <Search />
        <input type="text" placeholder="Search" />
      </div>
      <div className="sidebar__people">
        {friends.map((fr) => {
          return (
            <SideBarPerson
              key={fr._id}
              user={user}
              friend={fr}
              onFriendClick={onFriendClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default SideBar;
