const router = require("express").Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// GET cart items for user
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.user) filter.user = req.query.user;

    const cartItems = await Cart.find(filter).populate("product");
    res.json(cartItems);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD item to cart
router.post("/add", async (req, res) => {
  try {
    const { user, product } = req.body;
    const cartItem = new Cart({ user: user.id, product: product._id });
    const saved = await cartItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE item from cart
router.delete("/:id", async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.json({ msg: "Removed from cart" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
