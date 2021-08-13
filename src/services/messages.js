import axios from "axios";

const baseUrl = "https://chatvault.herokuapp.com/api/messages";

export const getUserMessages = async (conversationId) => {
  const response = await axios.get(`${baseUrl}/${conversationId}`);
  return response.data;
};

export const createMessage = async (newMessage) => {
  const response = await axios.post(baseUrl, newMessage);
  return response.data;
};
