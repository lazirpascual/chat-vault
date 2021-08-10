import React from "react";
import { Users } from "../../dummyData";
import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import Friends from "../friends/Friends";

const sidebarItems = [
  { icon: <RssFeed className="sidebarIcon" />, name: "Feed" },
  { icon: <Chat className="sidebarIcon" />, name: "Chats" },
  {
    icon: <PlayCircleFilledOutlined className="sidebarIcon" />,
    name: "Videos",
  },
  { icon: <Group className="sidebarIcon" />, name: "Groups" },
  { icon: <Bookmark className="sidebarIcon" />, name: "Bookmarks" },
  { icon: <HelpOutline className="sidebarIcon" />, name: "Questions" },
  { icon: <WorkOutline className="sidebarIcon" />, name: "Jobs" },
  { icon: <Event className="sidebarIcon" />, name: "Events" },
  { icon: <School className="sidebarIcon" />, name: "Courses" },
];

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          {sidebarItems.map((item) => (
            <li key={item.name} className="sidebarListItem">
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          {Users.map((u) => (
            <Friends key={u.id} user={u} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
