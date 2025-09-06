const router = require("express").Router();
const Order = require("../models/Order");

// GET orders for user
router.get("/", async (req, res) => {
  try {
    const filter = {};
    if (req.query.user) filter.user = req.query.user;

    const orders = await Order.find(filter).populate("items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PLACE new order
router.post("/", async (req, res) => {
  try {
    const { user, items } = req.body;
    const orderItems = items.map(i => ({ product: i.product._id, quantity: 1 }));

    const order = new Order({ user, items: orderItems });
    const saved = await order.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
