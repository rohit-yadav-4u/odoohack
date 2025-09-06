import React, { useState } from "react";
import axios from "axios";
import logo from "./Logo.png";
import "./Login.css";

export default function Login({ onLogin, onCreate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("Token", res.data.token);
      localStorage.setItem("userId", res.data.userId);

      alert("Login successful!");
      onLogin(); // Notify App.js
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="fullscreen-bg">
      <div className="overlay"></div>

      <form onSubmit={handleLogin} className="floating-login-form">
        <img src={logo} alt="Logo" className="login-logo" />

        <div className="input-wrapper">
          <i className="fas fa-user"></i>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ color: "white" }}
          />
        </div>

        <div className="input-wrapper">
          <i className="fas fa-lock"></i>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ color: "white" }}
          />
        </div>

        <div className="centered-login">
          <button type="submit" className="login-btn-wide">
            LOG IN
          </button>
        </div>

        <div className="form-links">
          <a href="/forgetpassword">Forgot password?</a>
        </div>

        <div className="centered-login">
          <button
            type="button"
            className="login-btn-wide create"
            onClick={onCreate} // go to register
          >
            Create new account
          </button>
        </div>
      </form>
    </div>
  );
}
