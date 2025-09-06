// src/pages/Profile.js
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("Token");
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("userId");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return <p className="text-center">Loading profile...</p>;

  if (!user) return <p className="text-center">No profile data available.</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p className="mb-2">
        <strong>Username:</strong> {user.username}
      </p>
      <p className="mb-2">
        <strong>Email:</strong> {user.email}
      </p>
      <p className="mb-4">
        <strong>User ID:</strong> {user.id}
      </p>

      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
