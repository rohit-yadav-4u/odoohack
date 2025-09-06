import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SavedItems() {
  const [cart, setCart] = useState(null);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!userId) return;
    axios
      .get(`http://localhost:5000/api/cart/${userId}`)
      .then((res) => setCart(res.data))
      .catch((err) => console.error(err));
  }, [userId]);

  if (!cart || !cart.products.length) return <p>No saved items yet.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Saved Items</h1>
      <div className="grid grid-cols-3 gap-4">
        {cart.products.map((p) => (
          <div key={p.productId._id} className="bg-white p-4 rounded shadow">
            <img
              src={p.productId.image}
              alt={p.productId.title}
              className="w-full h-32 object-cover mb-2"
            />
            <h2 className="font-bold">{p.productId.title}</h2>
            <p>Quantity: {p.quantity}</p>
            <p>${p.productId.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
