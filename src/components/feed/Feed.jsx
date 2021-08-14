import React, { useState, useEffect, useContext } from "react";
import Share from "../share/Share";
import Post from "../post/Post";
import { AuthContext } from "../../context/AuthContext";
import {
  getProfilePosts,
  getTimelinePosts,
  getAllPosts,
} from "../../services/posts";
import "./feed.css";

const Feed = ({ username, search }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const filterSearchedPost = async () => {
      const allPosts = await getAllPosts();
      const filteredPosts = allPosts.filter((post) =>
        post.desc.toLowerCase().match(search)
      );
      return filteredPosts;
    };

    const fetchPosts = async () => {
      const initialPosts = search
        ? await filterSearchedPost()
        : username
        ? await getProfilePosts(username)
        : await getTimelinePosts(user._id);
      setPosts(
        // sorts posts by most recent
        initialPosts.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPosts();
  }, [username, user?._id, search]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user?.username) && <Share />}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
