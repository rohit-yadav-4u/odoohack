import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        username,
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      alert(err.response.data.msg || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <form onSubmit={handleRegister} className="bg-green-50 p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-black">Register</h1>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-2 mb-4 border border-black rounded"
          required
        />
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
          Register
        </button>
        <p className="mt-4 text-black">
          Already have an account? <Link to="/" className="text-green-700 underline">Login</Link>
        </p>
      </form>
    </div>
  );
}
