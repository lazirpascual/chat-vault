import React, { useState, useEffect } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import { getAllUsers } from "../../services/users";
import Friends from "../../components/friends/Friends";
import { Link } from "react-router-dom";
import "./search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchedUsers, setSearchedUsers] = useState([]);

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
      // set search term to "null" so it doesnt search for whitespace,
      // and it doesn't pass an empty search term to Feed
      setSearchTerm(`null`);
    }
  }, [searchTerm]);

  const MapSearchedUsers = () => {
    return (
      <>
        <ul className="sidebarFriendList">
          {searchedUsers.map((user) => (
            <div key={user.username}>
              <Link
                to={`/profile/${user.username}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <Friends key={user.id} user={user} />
              </Link>
            </div>
          ))}
        </ul>
      </>
    );
  };

  const NoUsers = () => {
    return (
      <>
        <div>There are no matches for that user</div>
      </>
    );
  };

  return (
    <>
      <Topbar setSearchTerm={setSearchTerm} />
      <div className="homeContainer">
        <Sidebar className="searchLeft" />
        <div className="searchRight">
          <div className="searchText">Search for Friends, Posts, or Videos</div>
          <div className="postsText">People</div>
          {searchedUsers.length > 0 ? MapSearchedUsers() : NoUsers()}
          <div className="postsText">Posts</div>
          <Feed search={searchTerm} username="search" />
        </div>
      </div>
    </>
  );
};

export default Search;
