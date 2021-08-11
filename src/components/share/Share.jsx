import React, { useContext, useRef, useState } from "react";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import "./share.css";
import axios from "axios";

const shareItems = [
  {
    icon: <Label htmlColor="blue" className="shareIcon" />,
    name: "Tag",
  },
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
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post("/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("/posts", newPost);
      window.location.reload(); // reload page to update post state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? `${PF}${user.profilePicture}`
                : `${PF}person/noAvatar.png`
            }
            alt="Profile"
            className="shareProfileImg"
          />
          <input
            placeholder={`What's on your mind, ${user.username}?`}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        <form className="shareBottom" onSubmit={handleSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            {shareItems.map((item) => (
              <div key={item.name} className="shareOption">
                {item.icon}
                <span className="shareOptionText">{item.name}</span>
              </div>
            ))}
          </div>
          <button type="submit" className="shareButton">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
