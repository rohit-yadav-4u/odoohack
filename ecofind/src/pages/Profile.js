import React, { useEffect, useState } from "react";

export default function Profile({ onLogout, onGoToListings, onGoToCart }) {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    if (userId && username && email) {
      setUser({ id: userId, username, email });
      setFormData({ ...formData, username, email });
    }
    // eslint-disable-next-line
  }, []);

  if (!user) {
    return <p className="text-center">No user data found. Please log in.</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser({ ...user, ...formData });
    localStorage.setItem("username", formData.username);
    localStorage.setItem("email", formData.email);
    setEditMode(false);
    alert("Profile updated Successfully!");
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold text-green-600 mb-4">My Profile</h2>

      {/* Profile Image */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
          {user.username.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* User Info */}
      <div className="space-y-3">
        <div>
          <span className="font-semibold">Username:</span>{" "}
          {editMode ? (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="border p-1 rounded w-full"
            />
          ) : (
            user.username
          )}
        </div>

        <div>
          <span className="font-semibold">Email:</span>{" "}
          {editMode ? (
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-1 rounded w-full"
            />
          ) : (
            user.email
          )}
        </div>

        <div>
          <span className="font-semibold">Date of Birth:</span>{" "}
          {editMode ? (
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="border p-1 rounded w-full"
            />
          ) : (
            formData.dob || "—"
          )}
        </div>

        <div>
          <span className="font-semibold">Phone:</span>{" "}
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-1 rounded w-full"
            />
          ) : (
            formData.phone || "—"
          )}
        </div>

        <div>
          <span className="font-semibold">Address:</span>{" "}
          {editMode ? (
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="border p-1 rounded w-full"
            />
          ) : (
            formData.address || "—"
          )}
        </div>

        <div>
          <span className="font-semibold">User ID:</span> {user.id}
        </div>
      </div>

      {/* Edit/Save Buttons */}
      <div className="mt-4 flex gap-2">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>

  
    </div>
  );
}
