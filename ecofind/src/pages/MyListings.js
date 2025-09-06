import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MyListings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("Token");

      const res = await axios.get("http://localhost:5000/api/products/mine", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch your listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  if (!products.length) return <p className="text-center">No listings yet.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded p-4 shadow hover:shadow-lg transition"
        >
          <h3 className="font-semibold text-lg">{product.title}</h3>
          <p className="text-gray-600">${product.price}</p>
          <p className="mt-2 text-gray-800">{product.description}</p>
          <p
            className={`mt-2 font-semibold ${
              product.status === "active"
                ? "text-green-600"
                : product.status === "sold"
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            Status: {product.status}
          </p>
        </div>
      ))}
    </div>
  );
}
