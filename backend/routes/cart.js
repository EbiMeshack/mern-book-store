// routes/cart.js

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/Book");
const authMiddleware = require("../middleware/auth"); // Make sure to implement this middleware for authentication

// Get user cart
router.get("/", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("cart.bookId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user.cart);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
});

// Add item to cart
router.post("/add", authMiddleware, async (req, res) => {
  const { bookId, quantity } = req.body;

  try {
    const user = await User.findById(req.user.id);

    // Check if the book already exists in the cart
    const existingItem = user.cart.find(
      (item) => item.bookId.toString() === bookId
    );

    if (existingItem) {
      existingItem.quantity += quantity; // Update quantity
    } else {
      user.cart.push({ bookId, quantity });
    }

    await user.save();
    res.json(user.cart);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "Server error" });
  }
});

// Remove item from cart
router.delete("/remove/:bookId", authMiddleware, async (req, res) => {
  const { bookId } = req.params;
  try {
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter((item) => item.bookId.toString() !== bookId);
    await user.save();
    res.json(user.cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
