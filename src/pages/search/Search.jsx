import React, { useState, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import { getAllUsers } from "../../services/users";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import "./search.css";

const Search = () => {
  // initialize search term to unsearchable string so it doesnt search for whitespace,
  // and it doesn't pass an empty search term to Feed
  const [searchTerm, setSearchTerm] = useState(`.,/sdfe12z09=23.ds'`);
  const [searchedUsers, setSearchedUsers] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getAllUsers();
      const filteredUsers = allUsers.filter((user) =>
        user.username.toLowerCase().match(searchTerm)
      );
      setSearchedUsers(filteredUsers);
    };
    fetchUsers();
  }, [searchTerm]);

  useEffect(() => {
    if (!searchTerm) {
      setSearchTerm(`.,/sdfe12z09=23.ds'`);
    }
  }, [searchTerm]);

  const MapSearchedUsers = () => {
    return (
      <div className="searchUsersCard">
        <ul className="searchUsersWrapper">
          {searchedUsers.map((user) => (
            <div key={user.username}>
              <Link
                to={`/profile/${user.username}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <li className="searchUsersList">
                  <img
                    src={PF + user.profilePicture}
                    alt=""
                    className="searchUsersImg"
                  />
                  <span className="searchUsersName">{user.username}</span>
                </li>
              </Link>
              <hr className="searchUserHr" />
            </div>
          ))}
        </ul>
      </div>
    );
  };

  const NoPostsMessage = () => {
    return (
      <div className="noUsers">
        <ErrorOutlineIcon style={{ fontSize: 40, color: "red" }} />
        <div className="noUsersTextTitle">
          We didn't find any users with that name.
        </div>
        <div className="noUsersText">
          Make sure everything is spelled correctly or try different keywords.
        </div>
      </div>
    );
  };

  return (
    <>
      <Topbar setSearchTerm={setSearchTerm} />
      <div className="homeContainer">
        <Sidebar className="searchLeft" />
        <div className="searchRight">
          <div className="searchText">Search for Friends, Posts, or Videos</div>
          <div className="searchTerm">
            Search Results for
            {searchTerm === `.,/sdfe12z09=23.ds'` ? ` " "` : ` "${searchTerm}"`}
          </div>
          <div className="postsText">People</div>
          {searchedUsers.length > 0 ? MapSearchedUsers() : NoPostsMessage()}
          <div className="postsText">Posts</div>
          <Feed search={searchTerm} username="search" />
        </div>
      </div>
    </>
  );
};

export default Search;
