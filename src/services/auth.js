import axios from "axios";
import { LoginStart, LoginSuccess, LoginFailure } from "../context/AuthActions";

const baseUrl = "https://chatvault.herokuapp.com/api/auth";
// const baseUrl = "/api/auth";

export let token = null;

export const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

export const loginCall = async (userCredential, dispatch) => {
  dispatch(LoginStart());
  try {
    const response = await axios.post(`${baseUrl}/login`, userCredential);
    dispatch(LoginSuccess(response.data.user, response.data.token));
    setToken(response.data.token);
  } catch (error) {
    console.log(error);
    dispatch(LoginFailure(error));
  }
};

export const registerCall = async (user) => {
  const response = await axios.post(`${baseUrl}/register`, user);
  return response.data;
};
