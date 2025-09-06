import { useEffect, useState } from "react";
import API from "../api";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    API.get(`/cart?user=${userId}`)
      .then(res => setCartItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const removeFromCart = (id) => {
    API.delete(`/cart/${id}`)
      .then(() => setCartItems(cartItems.filter(item => item._id !== id)))
      .catch(err => console.error(err));
  };

  const placeOrder = () => {
    API.post("/orders", { user: userId, items: cartItems })
      .then(() => {
        alert("Order placed successfully!");
        setCartItems([]);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {cartItems.map(item => (
              <div key={item._id} className="bg-white p-4 rounded shadow">
                <img src={item.product.image} className="w-full h-32 object-cover mb-2"/>
                <h2 className="font-bold">{item.product.title}</h2>
                <p>${item.product.price}</p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={placeOrder}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
