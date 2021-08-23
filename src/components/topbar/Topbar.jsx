import React, { useContext, useRef, useEffect } from "react";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LogoutCall } from "../../context/AuthActions";
import { useHistory } from "react-router";
import "./topbar.css";

const Topbar = ({ setSearchTerm }) => {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const history = useHistory();
  const inputRef = useRef(null);

  useEffect(() => {
    setSearchTerm && inputRef.current.focus();
  }, [setSearchTerm]);

  const handleLogout = () => {
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
      <div className="topbarCenter" onClick={() => history.push(`/search`)}>
        <form className="searchBar" onSubmit={(e) => e.preventDefault()}>
          <Search className="searchIcon" />
          <input
            ref={inputRef}
            placeholder="Search for friend, post or video"
            className="searchInput"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
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
          </div>
          <Link
            to="/messenger"
            style={{ textDecoration: "none", color: "white" }}
          >
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">3</span>
            </div>
          </Link>
          <div className="topbarIconItem">
            <Notifications />
          </div>
        </div>
      </div>
      <Link to={`/profile/${user?.username}`}>
        <img
          src={
            user?.profilePicture
              ? `${PF}${user?.profilePicture}`
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
