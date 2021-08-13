import axios from "axios";
import { LoginStart, LoginSuccess, LoginFailure } from "../context/AuthActions";

const baseUrl = "https://chatvault.herokuapp.com/api/auth";

export const loginCall = async (userCredential, dispatch) => {
  dispatch(LoginStart());
  try {
    const response = await axios.post(`${baseUrl}/login`, userCredential);
    dispatch(LoginSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(LoginFailure(error));
  }
};

export const registerCall = async (user) => {
  const response = await axios.post(`${baseUrl}/register`, user);
  return response.data;
};
