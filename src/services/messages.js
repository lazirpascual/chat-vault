import axios from "axios";
import { token } from "./auth";

const baseUrl = "https://chatvault.herokuapp.com/api/messages";

export const getUserMessages = async (conversationId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(`${baseUrl}/${conversationId}`, config);
  return response.data;
};

export const createMessage = async (newMessage) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newMessage, config);
  return response.data;
};
