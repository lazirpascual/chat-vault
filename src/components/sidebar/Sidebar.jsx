import React from "react";
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
            <li className="sidebarListItem">
              {item.icon}
              <span>{item.name}</span>
            </li>
          ))}
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <li className="sidebarFriend">
            <img
              src="/assets/person/2.jpeg"
              alt=""
              className="sidebarFriendImg"
            />
            <span className="sidebarFriendName">Jane Doe</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
