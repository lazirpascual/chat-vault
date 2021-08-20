import React, { useState, useEffect } from "react";
import { getUserById } from "../../services/users";
import { Link } from "react-router-dom";
import "./conversation.css";

const Conversation = ({ conversation, currentUser, linkToProfile }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const friend = await getUserById(friendId);
        setUser(friend);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  const ConversationBody = (params) => {
    return (
      <div className="conversation">
        <img
          src={
            user?.profilePicture
              ? `${PF}${user.profilePicture}`
              : `${PF}person/noAvatar.png`
          }
          alt=""
          className="conversationImg"
        />
        <span className="conversationName">{user?.username}</span>
      </div>
    );
  };

  return (
    <div>
      {linkToProfile ? (
        <Link
          to={`/profile/${user?.username}`}
          style={{ textDecoration: "none", color: "black" }}
          key={user?.username}
        >
          {ConversationBody()}
        </Link>
      ) : (
        ConversationBody()
      )}
    </div>
  );
};

export default Conversation;
