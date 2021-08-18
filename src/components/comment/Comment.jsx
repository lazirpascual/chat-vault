import React from "react";
import "./comment.css";

const Comment = ({ currentUser }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="postTopLeft">
      <img
        src={
          currentUser.profilePicture
            ? PF + currentUser.profilePicture
            : PF + "person/noAvatar.png"
        }
        alt="Profile"
        className="postProfileImg"
      />
      <input className="commentInput" placeholder="Write a comment..."></input>
    </div>
  );
};

export default Comment;
