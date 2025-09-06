import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [savedItems, setSavedItems] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    // Fetch all products
    axios
      .get("http://localhost:5000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));

    // Fetch user's saved items
    if (userId) {
      axios
        .get(`http://localhost:5000/api/cart/${userId}`)
        .then(res => setSavedItems(res.data.products || []))
        .catch(err => console.error(err));
    }
  }, [userId]);

  // Filtering products by search and category
  let filteredProducts = products.filter(
    p =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? p.category === category : true)
  );

  // Sorting by price
  if (sort === "lowToHigh") filteredProducts.sort((a, b) => a.price - b.price);
  else if (sort === "highToLow") filteredProducts.sort((a, b) => b.price - a.price);

  const addToCart = async (product) => {
    if (!userId) return alert("Please login first!");

    try {
      const res = await axios.post("http://localhost:5000/api/cart/add", {
        userId,
        productId: product._id
      });
      setSavedItems(res.data.products); // Update saved items locally
      alert("Added to your saved items!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Browse Products</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
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
          <option value="Home & Kitchen">Home & Kitchen</option>
          <option value="Sports">Sports</option>
          <option value="Beauty">Beauty</option>
          <option value="Toys">Toys</option>
          <option value="Furniture">Furniture</option>
          <option value="Groceries">Groceries</option>
        </select>
        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Sort by Price</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map(p => (
          <div key={p._id} className="bg-white p-4 rounded shadow">
            <img src={p.image} alt={p.title} className="w-full h-32 object-cover mb-2"/>
            <h2 className="font-bold">{p.title}</h2>
            <p>${p.price}</p>
            <p className="text-sm text-gray-600">{p.category}</p>
            <button
              onClick={() => addToCart(p)}
              className="mt-2 bg-green-500 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Optional: Show user saved items preview */}
      {savedItems.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Your Saved Items</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedItems.map(item => (
              <div key={item.productId._id} className="bg-gray-100 p-3 rounded shadow">
                <img src={item.productId.image} alt={item.productId.title} className="w-full h-24 object-cover mb-1"/>
                <h3 className="font-semibold">{item.productId.title}</h3>
                <p>${item.productId.price}</p>
                <p>Qty: {item.quantity}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
