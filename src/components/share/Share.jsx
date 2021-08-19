import React, { useContext, useState } from "react";
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { Cancel } from "@material-ui/icons";
import { uploadPhoto, createPost } from "../../services/posts";
import Notification from "../notification/Notification";
import "./share.css";

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

const Share = ({ addPost }) => {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await uploadPhoto(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (desc) {
      try {
        const response = await createPost(newPost);
        addPost(response);
        setFile(null);
        setDesc("");
      } catch (error) {
        console.log(error);
      }
    } else {
      setOpenNotification(true);
      setNotificationMessage(`The post must contain a description.`);
    }
  };

  return (
    <div className="share">
      <Notification
        message={notificationMessage}
        open={openNotification}
        setOpen={setOpenNotification}
        type="error"
      />
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
            value={desc}
            placeholder={`What's on your mind, ${user.username}?`}
            className="shareInput"
            onChange={(e) => setDesc(e.target.value)}
            required
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
            <Cancel className="shareCancel" onClick={() => setFile(null)} />
          </div>
        )}
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
