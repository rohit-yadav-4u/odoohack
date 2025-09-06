// Add to cart
router.post("/cart/add", async (req, res) => {
  const { userId, productId } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }
    const existing = cart.products.find(p => p.productId == productId);
    if (existing) existing.quantity += 1;
    else cart.products.push({ productId, quantity: 1 });

    await cart.save();
    res.status(200).json(cart); // Send back the updated cart
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get user cart
router.get("/cart/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate("products.productId");
    if (!cart) return res.status(404).json({ msg: "Cart not found" });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});
