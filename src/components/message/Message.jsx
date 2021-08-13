import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { getUserById } from "../../services/users";
import "./message.css";

const Message = ({ own, message }) => {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const getUser = async () => {
      try {
        const initialUser = await getUserById(message.sender);
        setUser(initialUser);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [message]);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            user?.profilePicture
              ? PF + user?.profilePicture
              : `${PF}person/noAvatar.png`
          }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
