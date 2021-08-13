export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user, token) => ({
  type: "LOGIN_SUCCESS",
  user,
  token,
});

export const LoginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  payload: error,
});

export const LogoutCall = () => ({
  type: "LOGOUT",
});

export const Follow = (userId) => ({
  type: "FOLLOW",
  payload: userId,
});

export const Unfollow = (userId) => ({
  type: "UNFOLLOW",
  payload: userId,
});
