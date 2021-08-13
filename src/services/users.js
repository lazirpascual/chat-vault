import axios from "axios";
import { token } from "./auth";

const baseUrl = "https://chatvault.herokuapp.com/api/users";

export const getUserById = async (userId) => {
  const response = await axios.get(`${baseUrl}/?userId=${userId}`);
  return response.data;
};

export const getUserByName = async (username) => {
  const response = await axios.get(`${baseUrl}/?username=${username}`);
  return response.data;
};

export const getUserFriends = async (userId) => {
  const response = await axios.get(`${baseUrl}/friends/${userId}`);
  return response.data;
};

export const followUser = async (userToFollow, currentUser) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${userToFollow}/follow`,
    currentUser,
    config
  );
  return response.data;
};

export const unfollowUser = async (userToFollow, currentUser) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(
    `${baseUrl}/${userToFollow}/unfollow`,
    currentUser,
    config
  );
  return response.data;
};
