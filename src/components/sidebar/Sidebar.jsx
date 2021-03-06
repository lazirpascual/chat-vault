import React, { useEffect, useState, useContext } from "react";
import { Users } from "../../dummyData";
import Friends from "../friends/Friends";
import { AuthContext } from "../../context/AuthContext";
import { getUserFriends } from "../../services/users";
import { Link } from "react-router-dom";
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
import "./sidebar.css";

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
  const [friends, setFriends] = useState([]);
  const { user } = useContext(AuthContext);
  const users = friends.length > 0 ? friends : Users;

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await getUserFriends(user?._id);
        setFriends(friendList);
      } catch (error) {
        console.log(error);
      }
    };
    user?._id && getFriends();
  }, [user]);

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
        <h3 className="sidebarTitle">
          {friends.length > 0
            ? `Friends (${friends.length})`
            : `Recommended Friends`}
        </h3>
        <ul className="sidebarFriendList">
          {users.map((friend) => (
            <div key={friend.username}>
              <Link
                to={`/profile/${friend.username}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Friends key={friend.id} user={friend} />
              </Link>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
