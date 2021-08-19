import { useContext, useRef, useState } from "react";
import { loginCall } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Notification from "../../components/notification/Notification";
import "./login.css";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);
  const history = useHistory();
  const [openNotification, setOpenNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleClick = async (e) => {
    e.preventDefault();
    const loginResponse = await loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    if (!loginResponse) {
      setNotificationMessage(`Invalid Username or Password`);
      setOpenNotification(true);
    }
  };

  const handleDemoClick = async (e) => {
    e.preventDefault();
    await loginCall({ email: `demo@gmail.com`, password: `123456` }, dispatch);
  };

  return (
    <div className="login">
      <Notification
        message={notificationMessage}
        open={openNotification}
        setOpen={setOpenNotification}
        type="error"
      />
      {isFetching && (
        <div className="loginLoadingMessage">
          Please wait until the API is fetched and the site loads
          <CircularProgress
            className="loginLoadingAnimation"
            color="white"
            size="20px"
          />
        </div>
      )}
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Chat Vault</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Chat Vault.
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleClick} className="loginBox">
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="inherit" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <button
              onClick={handleDemoClick}
              className="loginButton"
              disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In With Demo Account"
              )}
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button
              className="loginRegisterButton"
              onClick={() => history.push(`/register`)}
            >
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
