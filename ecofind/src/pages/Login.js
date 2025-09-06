import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: connect to backend
    console.log("Login with", email, password);
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-accent/20">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-primary mb-4">Login</h2>
        <input type="email" placeholder="Email"
          className="w-full border rounded p-2 mb-3"
          value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password"
          className="w-full border rounded p-2 mb-3"
          value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" className="w-full bg-primary text-white py-2 rounded hover:bg-secondary">
          Login
        </button>
        <p className="text-sm mt-3 text-center">
          Don’t have an account? <Link to="/register" className="text-primary">Register</Link>
        </p>
      </form>
    </div>
  );
}
