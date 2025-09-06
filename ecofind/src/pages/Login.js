import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Login.css';
import logo from './Logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  const create = () => {
    navigate('/register');
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
            placeholder="Username"
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
          <button type="submit" className="login-btn-wide">LOG IN</button>
        </div>

        <div className="form-links">
          <Link to="/forgetpassword">Forgot password?</Link>
        </div>

        <div className="centered-login">
          <button type="button" className="login-btn-wide create" onClick={create}>
            Create new account
          </button>
        </div>
      </form>

      {/* <footer className="footer">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms Of Use</a>
        </div>
        <div className="footer-copy">
          © 2025 Indian Art. All Rights Reserved | Design By <span className="designer">W3layouts</span>
        </div>
      </footer> */}
    </div>
  );
}
