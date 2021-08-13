import axios from "axios";

const baseUrl = "https://chatvault.herokuapp.com/api/conversations";

export const getConversation = async (currentId, userId) => {
  const response = await axios.get(`${baseUrl}/find/${currentId}/${userId}`);
  return response.data;
};

export const getAllConversations = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
};
