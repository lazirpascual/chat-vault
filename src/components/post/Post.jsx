import React, { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import ModifyPost from "../modifyPost/ModifyPost";
import { AuthContext } from "../../context/AuthContext";
import { getUserById } from "../../services/users";
import { likeDislikePost } from "../../services/posts";
import Highlighter from "react-highlight-words";
import { TextField, IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import "./post.css";

const Post = ({ post, search, deletePost }) => {
  const [like, setLike] = useState(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [editDesc, setEditDesc] = useState(false);
  const [desc, setDesc] = useState(post?.desc);
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    // if the post.likes array already includes current id, the post is already liked
    setIsLiked(post.likes.includes(currentUser?._id));
  }, [currentUser?._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const initialUser = await getUserById(post.userId);
      setUser(initialUser);
    };
    fetchUser();
  }, [post.userId]);

  const likeHandler = async () => {
    try {
      await likeDislikePost(post._id, { userId: currentUser._id });
    } catch (error) {
      console.log(error);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const handleEditClick = () => {
    setEditDesc(true);
  };

  const handleSave = () => {
    setEditDesc(false);
  };

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt="Profile"
                className="postProfileImg"
              />
            </Link>
            <Link
              to={`profile/${user.username}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <span className="postUsername">{user.username}</span>
            </Link>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <ModifyPost
              userId={currentUser._id}
              post={post}
              deletePost={deletePost}
              handleEditClick={handleEditClick}
            />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            {editDesc === false ? (
              <Highlighter
                searchWords={[search]}
                autoEscape={true}
                textToHighlight={desc}
              />
            ) : (
              <>
                <TextField
                  label="Post Description"
                  autoFocus={true}
                  variant="filled"
                  color="primary"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  style={{ width: 500 }}
                ></TextField>
                <IconButton onClick={handleSave}>
                  <SaveIcon style={{ fontSize: 35, marginLeft: 5 }} />
                </IconButton>
              </>
            )}
          </span>
          <img src={PF + post.img} alt="Post" className="postImg" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className={isLiked ? "likeIcon" : "likeIconPressed"}
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIconPressed"
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
