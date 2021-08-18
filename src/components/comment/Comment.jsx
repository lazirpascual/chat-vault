import React, { useState, useEffect, useRef } from "react";
import { updatePostService } from "../../services/posts";
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
    // update post so it contains new comment only when comments state changes
    prevComments < comments && updateComment();
  }, [comments, post, prevComments, updatePost]);

  const addComment = async (event) => {
    // add comment to comments list
    event.preventDefault();
    const newComment = {
      desc: userComment,
      name: currentUser.username,
      picture: currentUser.profilePicture,
    };
    setComments([...comments, newComment]);
    setViewComments(true);
    setUserComment("");
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
          ></input>
        </form>
      </div>
      {viewComments &&
        comments.map((comment, index) => (
          <div className="userCommentContainer" key={index}>
            <img
              src={
                comment.picture
                  ? PF + comment.picture
                  : PF + "person/noAvatar.png"
              }
              alt="Profile"
              className="postProfileImg"
            />
            <div className="commentBody">
              <p className="commentBodyName">{comment.name}</p>
              <p>{comment.desc}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default Comment;
