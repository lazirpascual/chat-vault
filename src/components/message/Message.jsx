import React from "react";
import "./message.css";

const Message = ({ own }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img className="messageImg" src={PF + "person/1.jpeg"} alt="" />
        <p className="messageText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ad
          consequatur vero minus? Voluptatum quae non officiis! In iure dolore
          vitae sit numquam corporis. Rerum id quo iure accusantium voluptates.
        </p>
      </div>
      <div className="messsageBottom">1 hour ago</div>
    </div>
  );
};

export default Message;
