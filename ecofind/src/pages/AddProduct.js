import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(""); // new
  const [image, setImage] = useState(""); // optional
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("Token");

      const res = await axios.post(
        "http://localhost:5000/api/products",
        { title, price, description, category, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Product added successfully!");
      setTitle("");
      setPrice("");
      setDescription("");
      setCategory("");
      setImage("");
    } catch (err) {
      alert(err.response?.data?.msg || "Failed to add product");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleAddProduct} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}
