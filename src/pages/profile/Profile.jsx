import React from "react";
import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src="assets/post/3.jpeg"
                alt="Cover"
              />
              <img
                className="profileUserImg"
                src="assets/person/7.jpeg"
                alt="Profile"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Lazir Pascual</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
            {/* the profile prop specifies the correct component to render */}
          </div>
        </div>
      </div>
    </>
  );
}
