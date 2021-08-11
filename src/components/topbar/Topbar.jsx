import React, { useContext } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LogoutCall } from "../../context/AuthActions";

const Topbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLogout = (params) => {
    window.localStorage.removeItem("user");
    dispatch(LogoutCall());
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Chat Vault</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <span className="topbarLink">Home</span>
          </Link>
          <span className="topbarLink" onClick={handleLogout}>
            Log Out
          </span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link
            to="/messenger"
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
          </Link>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
      </div>
      <Link to={`/profile/${user.username}`}>
        <img
          src={
            user.profilePicture
              ? `${PF}${user.profilePicture}`
              : `${PF}person/noAvatar.png`
          }
          alt=""
          className="topbarImg"
        />
      </Link>
    </div>
  );
};

export default Topbar;
