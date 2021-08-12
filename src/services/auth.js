import axios from "axios";
import { LoginStart, LoginSuccess, LoginFailure } from "../context/AuthActions";

export const loginCall = async (userCredential, dispatch) => {
  dispatch(LoginStart());
  try {
    const response = await axios.post(
      "https://chatvault.herokuapp.com/api/auth/login",
      userCredential
    );
    dispatch(LoginSuccess(response.data));
  } catch (error) {
    dispatch(LoginFailure(error));
  }
};

export const registerCall = async (user) => {
  const response = await axios.post(
    "https://chatvault.herokuapp.com/api/auth/register",
    user
  );
  return response.data;
};
