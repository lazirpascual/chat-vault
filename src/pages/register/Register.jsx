import React, { useRef, useContext } from "react";
import { loginCall, registerCall } from "../../services/auth";
import { AuthContext } from "../../context/AuthContext";
import { useHistory } from "react-router";
import "./register.css";

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      password.current.setCustomValidity(
        "The password you entered does not match."
      );
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        const registerResponse = await registerCall(user);
        const loginResponse = loginCall(
          { email: email.current.value, password: password.current.value },
          dispatch
        );
        if (registerResponse && loginResponse) {
          history.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Chat Vault</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Chat Vault
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleSubmit}>
            <input
              required
              placeholder="Full Name"
              ref={username}
              className="loginInput"
            />
            <input
              required
              placeholder="Email"
              ref={email}
              className="loginInput"
              type="email"
            />
            <input
              required
              placeholder="Password"
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              required
              placeholder="Enter Password Again"
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
            <span
              className="loginForgot"
              onClick={() => history.push(`/login`)}
            >
              Already have an account? Log in
            </span>
            <button type="submit" className="loginButton">
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
