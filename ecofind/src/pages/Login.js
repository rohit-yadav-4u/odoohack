import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response.data.msg || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <form onSubmit={handleLogin} className="bg-green-50 p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-black">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-black rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border border-black rounded"
          required
        />
        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">
          Login
        </button>
        <p className="mt-4 text-black">
          Don't have an account? <Link to="/register" className="text-green-700 underline">Register</Link>
        </p>
      </form>
    </div>
  );
}
