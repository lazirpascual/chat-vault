import React, { useState, useEffect, useContext } from "react";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import ModifyPost from "../modifyPost/ModifyPost";
import { AuthContext } from "../../context/AuthContext";
import { getUserById } from "../../services/users";
import { likeDislikePost, updatePostService } from "../../services/posts";
import Highlighter from "react-highlight-words";
import { TextField, IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import Comment from "../comment/Comment";
import "./post.css";

const Post = ({ post, search, deletePost, updatePost }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [like, setLike] = useState(post.likes ? post.likes.length : 0);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [editDesc, setEditDesc] = useState(false);
  const [desc, setDesc] = useState(post?.desc);
  const [viewComments, setViewComments] = useState(false);

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

  const handleSave = async () => {
    setEditDesc(false);
    const updatedPost = { ...post, desc: desc };
    try {
      await updatePostService(post._id, updatedPost);
      updatePost(updatedPost);
    } catch (error) {
      console.log(error);
    }
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
                <form onSubmit={handleSave}>
                  <TextField
                    label="Post Description"
                    autoFocus={true}
                    variant="filled"
                    color="primary"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    style={{ width: 500 }}
                  ></TextField>
                  <IconButton type="submit">
                    <SaveIcon style={{ fontSize: 30, marginLeft: 5 }} />
                  </IconButton>
                </form>
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
          <div
            className="postBottomRight"
            onClick={() => setViewComments(!viewComments)}
          >
            <span className="postCommentText">
              {post.comments.length}{" "}
              {post.comments.length !== 1 ? `comments` : `comment`}
            </span>
          </div>
        </div>
        <hr className="postHr" />
        <Comment
          currentUser={currentUser}
          postComments={post.comments}
          viewComments={viewComments}
          setViewComments={setViewComments}
          post={post}
          updatePost={updatePost}
        />
      </div>
    </div>
  );
};

export default Post;
