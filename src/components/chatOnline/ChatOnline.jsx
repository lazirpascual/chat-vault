import React, { useState, useEffect } from "react";
import { getUserFriends } from "../../services/users";
import { getConversation } from "../../services/conversations";
import "./chatOnline.css";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    // fetch user's friends (following)
    const getFriends = async () => {
      try {
        const friends = await getUserFriends(currentId);
        setFriends(friends);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [currentId]);

  useEffect(() => {
    // filter user's friends who are online
    setOnlineFriends(
      friends.filter((friend) => onlineUsers.includes(friend._id))
    );
  }, [onlineUsers, friends]);

  const handleClick = async (user) => {
    try {
      const conversation = await getConversation(currentId, user._id);
      setCurrentChat(conversation);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="chatOnline">
        <h3 className="rightbarTitle">Online Friends</h3>
        {onlineFriends.map((friend) => (
          <div
            key={friend._id}
            className="chatOnlineFriend"
            onClick={() => handleClick(friend)}
          >
            <div className="chatOnlineImgContainer">
              <img
                className="chatOnlineImg"
                src={
                  friend?.profilePicture
                    ? PF + friend.profilePicture
                    : `${PF}person/noAvatar.png`
                }
                alt="Avatar"
              />
              <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{friend?.username}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default ChatOnline;
