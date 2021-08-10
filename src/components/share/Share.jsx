import React from "react";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import "./share.css";

const shareItems = [
  {
    icon: <PermMedia htmlColor="tomato" className="shareIcon" />,
    name: "Photo or Video",
  },
  { icon: <Label htmlColor="blue" className="shareIcon" />, name: "Tag" },
  {
    icon: <Room htmlColor="green" className="shareIcon" />,
    name: "Location",
  },
  {
    icon: <EmojiEmotions htmlColor="goldrenrod" className="shareIcon" />,
    name: "Reaction",
  },
];

const Share = () => {
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src="/assets/person/1.jpeg"
            alt="Profile"
            className="shareProfileImg"
          />
          <input placeholder="What's on your mind?" className="shareInput" />
        </div>
        <hr className="shareHr" />
        <div className="shareBottom">
          <div className="shareOptions">
            {shareItems.map((item) => (
              <div key={item.name} className="shareOption">
                {item.icon}
                <span className="shareOptionText">{item.name}</span>
              </div>
            ))}
          </div>
          <button className="shareButton">Share</button>
        </div>
      </div>
    </div>
  );
};

export default Share;
