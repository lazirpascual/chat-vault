import axios from "axios";
import { token } from "./auth";

const baseUrl = "https://chatvault.herokuapp.com/api/conversations";

export const createConversation = async (members) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, members, config);
  return response.data;
};

export const getConversation = async (currentId, userId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(
    `${baseUrl}/find/${currentId}/${userId}`,
    config
  );
  return response.data;
};

export const getAllConversations = async (userId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/${userId}`, config);
  return response.data;
};
