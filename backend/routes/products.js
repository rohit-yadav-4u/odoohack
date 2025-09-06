const router = require("express").Router();
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ msg: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "Invalid token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Token is not valid" });
  }
};

// ✅ GET all products (public dashboard)
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("seller", "username email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch products" });
  }
});

// ✅ GET my products (private)
router.get("/mine", verifyToken, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.userId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch your products" });
  }
});

// ✅ POST new product
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;

    const newProduct = new Product({
      title,
      price,
      description,
      category,
      image,
      seller: req.userId,
      status: "active",
    });

    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ msg: "Failed to add product" });
  }
});

// ✅ DELETE product
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: "Product not found" });
    if (String(product.seller) !== req.userId)
      return res.status(403).json({ msg: "Unauthorized" });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete product" });
  }
});

module.exports = router;
