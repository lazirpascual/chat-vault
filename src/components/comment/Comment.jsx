import React, { useState, useEffect, useRef } from "react";
import { updatePostService } from "../../services/posts";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { IconButton } from "@material-ui/core";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Popover from "@material-ui/core/Popover";

import uuid from "uuid/dist/v1";
import { Link } from "react-router-dom";
import "./comment.css";

const Comment = ({
  currentUser,
  postComments,
  viewComments,
  setViewComments,
  post,
  updatePost,
}) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [comments, setComments] = useState(postComments);
  const [userComment, setUserComment] = useState("");

  const prevCommentsRef = useRef();
  useEffect(() => {
    prevCommentsRef.current = comments;
  });
  const prevComments = prevCommentsRef.current;

  useEffect(() => {
    const updateComment = async () => {
      const updatedPost = { ...post, comments: comments };
      try {
        await updatePostService(post._id, updatedPost);
        updatePost(updatedPost);
      } catch (error) {
        console.log(error);
      }
    };
    // update post so it contains new comment only when adding/deleting comments
    (prevComments < comments || prevComments > comments) && updateComment();
  }, [comments, post, prevComments, updatePost]);

  const addComment = async (event) => {
    // add comment to comments list
    event.preventDefault();
    const newComment = {
      desc: userComment,
      name: currentUser.username,
      picture: currentUser.profilePicture,
      id: uuid(),
    };
    setComments([...comments, newComment]);
    setViewComments(true);
    setUserComment("");
  };

  const deleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to remove this comment?")) {
      setComments(comments.filter((comment) => comment.id !== commentId));
    }
  };

  return (
    <>
      <div className="commentHeader">
        <img
          src={
            currentUser.profilePicture
              ? PF + currentUser.profilePicture
              : PF + "person/noAvatar.png"
          }
          alt="Profile"
          className="postProfileImg"
        />
        <form onSubmit={addComment} className="commentFormInput">
          <input
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            className="commentInput"
            placeholder="Write a comment..."
            required
          ></input>
        </form>
      </div>
      {viewComments &&
        comments.map((comment, index) => (
          <div className="userCommentContainer" key={index}>
            <Link
              to={`/profile/${comment.name}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <img
                src={
                  comment.picture
                    ? PF + comment.picture
                    : PF + "person/noAvatar.png"
                }
                alt="Profile"
                className="postProfileImg"
              />
            </Link>
            <div className="commentBody">
              <Link
                to={`/profile/${comment.name}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <p className="commentBodyName">{comment.name}</p>{" "}
              </Link>
              <p>{comment.desc}</p>
            </div>
            {currentUser.username === comment.name && (
              <PopupState variant="popover" popupId="demo-popup-popover">
                {(popupState) => (
                  <div>
                    <IconButton {...bindTrigger(popupState)}>
                      <MoreHorizIcon className="commentBodyIcon" />
                    </IconButton>
                    <Popover
                      {...bindPopover(popupState)}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "center",
                      }}
                    >
                      <div className="modifyPostContainer">
                        <IconButton onClick={() => deleteComment(comment.id)}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </div>
                    </Popover>
                  </div>
                )}
              </PopupState>
            )}
          </div>
        ))}
    </>
  );
};

export default Comment;
