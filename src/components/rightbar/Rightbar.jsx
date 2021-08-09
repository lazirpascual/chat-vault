import React from "react";
import "./rightbar.css";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        <div className="birthdayContainer">
          <img src="assets/gift.png" alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 others</b> have a birthday today.
          </span>
        </div>
        <img src="assets/ad.png" alt="" className="rightbarAd" />
        <h3 className="rightbarTitle">Online Friends</h3>
        <ul className="rightbarFriendList">
          <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
              <img
                src="assets/person/3.jpeg"
                alt=""
                className="rightbarProfileImg"
              />
              <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUsername">Joanna James</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Rightbar;
