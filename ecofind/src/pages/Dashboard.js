import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const userId = localStorage.getItem("userId"); // Make sure to store this on login

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredProducts = products.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase()) &&
    (category ? p.category === category : true)
  );

  const addToCart = (product) => {
    if (!userId) return alert("Please login first!");

    axios.post("http://localhost:5000/api/cart/add", {
      userId,
      productId: product._id
    })
    .then(() => alert("Added to cart!"))
    .catch(err => console.error(err));
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Browse Products</h1>

      <div className="flex gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by title"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map(p => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <img src={p.image} alt={p.title} className="w-full h-32 object-cover mb-2"/>
            <h2 className="font-bold">{p.title}</h2>
            <p>${p.price}</p>
            <button
              onClick={() => addToCart(p)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
