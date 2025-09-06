import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");

    // In a real app, fetch user data from backend here
    setUser({ username: "Demo User" });
  }, [navigate]);

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };
  const handleLogout = () => {
  // Clear auth/session data
  localStorage.removeItem("authToken");

  // Redirect to login (replace history so back button won’t return)
  navigate("/login", { replace: true });
};


  return (
    <>
    <Navbar/>
{/* 
    <div className="p-8 bg-green-50 min-h-screen">
      <h1 className="text-2xl font-bold text-black">Welcome, {user?.username}</h1>
      <button
        onClick={handleLogout}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Logout
      </button>
    </div> */}
    </>
  );
}
