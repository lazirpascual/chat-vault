import React, { useState, useEffect } from "react";
import { MoreVert } from "@material-ui/icons";
import axios from "axios";
import "./post.css";

const Post = ({ post }) => {
  const [like, setLike] = useState(post.like ? post.like.length : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`users/${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, []);

  const likeHandler = () => {
    // if it is already liked, decremenent, else, increment like value
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={user.profilePicture || PF + "person/noAvatar.png"} // use custom avatar if profile pic does not exist
              alt="Profile"
              className="postProfileImg"
            />
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img src={PF + post.img} alt="Post" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">
              {like} People liked this post
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.comment} {post.comment > 1 ? `comments` : `comment`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
