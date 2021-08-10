export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (userCredentials) => ({
  type: "LOGIN_SUCCESS",
  payload: userCredentials,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});
