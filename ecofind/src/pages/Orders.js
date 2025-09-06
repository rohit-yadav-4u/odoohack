import { useEffect, useState } from "react";
import API from "../api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    API.get(`/orders?user=${userId}`)
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white p-4 rounded shadow">
              <h2 className="font-bold mb-2">Order ID: {order._id}</h2>
              {order.items.map(item => (
                <div key={item.product._id} className="flex justify-between mb-1">
                  <span>{item.product.title}</span>
                  <span>${item.product.price}</span>
                </div>
              ))}
              <p className="mt-2 font-semibold">Total: ${order.items.reduce((sum, i) => sum + i.product.price, 0)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
