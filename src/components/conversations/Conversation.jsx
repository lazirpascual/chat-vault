import React, { useState, useEffect } from "react";
import { getUserById } from "../../services/users";
import { Link } from "react-router-dom";
import "./conversation.css";

const Conversation = ({
  conversation,
  currentUser,
  linkToProfile,
  currentChat,
}) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const currentConvoFriendId = conversation.members.find(
    (m) => m !== currentUser._id
  );
  const currentChatFriendId = currentChat?.members.find(
    (m) => m !== currentUser._id
  );

  useEffect(() => {
    const getUser = async () => {
      try {
        const friend = await getUserById(currentConvoFriendId);
        setUser(friend);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation, currentConvoFriendId]);

  const ConversationBody = () => {
    return (
      <div
        className={
          currentChatFriendId === currentConvoFriendId
            ? "conversationSelected"
            : "conversation"
        }
      >
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
