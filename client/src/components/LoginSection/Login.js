import React, { useState } from "react";
import axios from "../../axios";
import "./Login.css";
import { Redirect } from "react-router-dom";
function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.get("/login/login", {
      withCredentials: true,
      params: {
        name,
        password,
      },
    });
    if (res.data.message === "success") {
      setRedirect(true);
    }
  };
  return redirect ? (
    <Redirect to="/chat" />
  ) : (
    <div className="login">
      <div className="login__images"></div>
      <div className="login__main">
        <p className="login__title">chatable</p>
        <form onSubmit={handleOnSubmit} className="login__form">
          <input
            value={name}
            type="text"
            name="name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="ENTER YOUR NAME"
            className="login__name"
            required
          />
          <input
            value={password}
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="ENTER YOUR PASSWORD"
            name="password"
            className="login__password"
            required
          />
          <button type="submit">Log In</button>
        </form>
        <div className="login__sub">
          <a href="dau cac moi">Create An Account</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
