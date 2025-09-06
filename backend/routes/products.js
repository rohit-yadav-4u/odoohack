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

// GET products for logged-in user
router.get("/", verifyToken, async (req, res) => {
  try {
    const products = await Product.find({ seller: req.userId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch products", error: err.message });
  }
});

// POST new product
router.post("/", verifyToken, async (req, res) => {
  try {
    const { title, price, description, category, image } = req.body;

    if (!title || !price || !description || !category) {
      return res.status(400).json({ msg: "All required fields must be filled" });
    }

    const newProduct = new Product({
      title,
      price,
      description,
      category,
      image: image || "",
      seller: req.userId,
      status: "active",
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ msg: "Failed to add product", error: err.message });
  }
});

// DELETE a product
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    if (product.seller.toString() !== req.userId)
      return res.status(403).json({ msg: "Unauthorized" });

    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete product", error: err.message });
  }
});

module.exports = router;
