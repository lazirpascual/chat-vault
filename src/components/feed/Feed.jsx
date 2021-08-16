import React, { useState, useEffect, useContext } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import { AuthContext } from "../../context/AuthContext";
import {
  getProfilePosts,
  getTimelinePosts,
  getAllPosts,
} from "../../services/posts";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import "./feed.css";

const Feed = ({ username, search }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const filterSearchedPost = async () => {
      try {
        const allPosts = await getAllPosts();
        const filteredPosts = allPosts.filter((post) =>
          post.desc.toLowerCase().match(search)
        );
        return filteredPosts;
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPosts = async () => {
      const initialPosts = search
        ? await filterSearchedPost()
        : username
        ? await getProfilePosts(username)
        : await getTimelinePosts(user._id);
      setPosts(
        // sorts posts by most recent
        initialPosts &&
          initialPosts.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
      );
    };
    fetchPosts();
  }, [username, user?._id, search]);

  const NoPostsMessage = () => {
    return (
      <>
        {search ? (
          <div className="noUsers">
            <ErrorOutlineIcon style={{ fontSize: 40, color: "red" }} />
            <div className="noUsersTextTitle">We didn't find any results.</div>
            <div className="noUsersText">
              Make sure everything is spelled correctly or try different
              keywords.
            </div>
          </div>
        ) : (
          <div className="noPosts">
            <AddAPhotoOutlinedIcon className="noPostsIcon" />
            <div className="noPostsText">No Posts Yet</div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user?.username) && <Share />}
        {posts.length > 0
          ? posts.map((p) => <Post key={p._id} post={p} />)
          : NoPostsMessage()}
      </div>
    </div>
  );
};

export default Feed;
