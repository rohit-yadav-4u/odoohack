import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Login.css";
import logo from "./Logo.png";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Handle Google Registration
  const handleGoogleResponse = async (response) => {
    try {
      const userObject = jwtDecode(response.credential);
      alert(`Welcome ${userObject.name}`);

      // Example backend call for Google register/login
      const res = await axios.post("http://localhost:5000/api/auth/google", {
        name: userObject.name,
        email: userObject.email,
        googleId: userObject.sub,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google registration error:", error);
      alert("Google registration failed. Try again.");
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "367913843312-pv7abojnlvlrce2rhcnu3656fgacghfe.apps.googleusercontent.com",
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-btn"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  // ✅ Normal Registration (username, email, password)
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="fullscreen-bg">
      <div className="overlay"></div>

      <form onSubmit={handleRegister} className="floating-login-form">
        <img src={logo} alt="Logo" className="login-logo" />

        {/* Username */}
        <div className="input-wrapper">
          <i className="fas fa-user"></i>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ color: "white" }}
          />
        </div>

        {/* Email */}
        <div className="input-wrapper">
          <i className="fas fa-envelope"></i>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ color: "white" }}
          />
        </div>

        {/* Password */}
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

        {/* Register Button */}
        <div className="centered-login">
          <button
            type="submit"
            className="login-btn-wide"
            style={{
              backgroundColor: "#4CAF50",
              borderRadius: "40px",
              width: "260px",
              height: "40px",
              fontSize: "16px",
            }}
          >
            REGISTER
          </button>
        </div>

        {/* Google Register */}
        <div className="register-options">
          <p style={{ color: "white", marginTop: "20px" }}>OR REGISTER USING</p>
          <div id="google-btn" style={{ marginTop: "20px" }}></div>
        </div>

        {/* Link to login */}
        <div className="form-links">
          <p>
            <span style={{ color: "white" }}>Already have an account? </span>
            <Link to="/" style={{ color: "#46c60b" }}>
              Login
            </Link>
          </p>
        </div>
      </form>

      {/* <footer className="footer">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms Of Use</a>
        </div>
        <div className="footer-copy">
          © 2025 Indian Art. All Rights Reserved | Design By{" "}
          <span className="designer">W3layouts</span>
        </div>
      </footer> */}
    </div>
  );
}
