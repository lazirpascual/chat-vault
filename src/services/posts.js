import axios from "axios";
import { token } from "./auth";

const baseUrl = "https://chatvault.herokuapp.com/api/posts";
// const baseUrl = "/api/posts";

export const getAllPosts = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const getProfilePosts = async (username) => {
  const response = await axios.get(`${baseUrl}/profile/${username}`);
  return response.data;
};

export const getTimelinePosts = async (userId) => {
  const response = await axios.get(`${baseUrl}/timeline/${userId}`);
  return response.data;
};

export const likeDislikePost = async (postId, userId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${postId}/like`, userId, config);
  return response.data;
};

export const createPost = async (newPost) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newPost, config);
  return response.data;
};

export const uploadPhoto = async (photo) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `https://chatvault.herokuapp.com/api/upload`,
    photo,
    config
  );
  return response.data;
};
