import axios from "axios";

const baseUrl = "https://chatvault.herokuapp.com/api/posts";

export const getProfilePosts = async (username) => {
  const response = await axios.get(`${baseUrl}/profile/${username}`);
  return response.data;
};

export const getTimelinePosts = async (userId) => {
  const response = await axios.get(`${baseUrl}/timeline/${userId}`);
  return response.data;
};

export const likeDislikePost = async (postId, userId) => {
  const response = await axios.put(`${baseUrl}/${postId}/like`, userId);
  return response.data;
};

export const createPost = async (newPost) => {
  const response = await axios.post(baseUrl, newPost);
  return response.data;
};

export const uploadPhoto = async (photo) => {
  const response = await axios.post(
    `https://chatvault.herokuapp.com/api/upload`,
    photo
  );
  return response.data;
};
