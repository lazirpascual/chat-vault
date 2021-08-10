import React, { useRef } from "react";
import "./login.css";

const Login = () => {
  // use useRef instead of useState for forms to prevent rerenders
  const email = useRef();
  const password = useRef();

  const handleSubmit = (e) => {
    e.prevent.default();
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
        <div className="loginRight" onSubmit={handleSubmit}>
          <form className="loginBox">
            <input
              ref={email}
              placeholder="Email"
              type="email"
              className="loginInput"
              required
            />
            <input
              ref={password}
              placeholder="Password"
              type="password"
              className="loginInput"
              minLength="6"
              required
            />
            <button className="loginButton">Log In</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">Create New Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
