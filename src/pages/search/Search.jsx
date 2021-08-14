import React, { useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import "./search.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Topbar setSearchTerm={setSearchTerm} />
      <div className="homeContainer">
        <Sidebar className="searchLeft" />
        <div className="searchRight">
          <div className="searchText">Search for Friends, Posts, or Videos</div>
          {searchTerm && <div className="postsText">Posts</div>}
          <Feed search={searchTerm} username="search" />
        </div>
      </div>
    </>
  );
};

export default Search;
