const express = require("express");
const mongoose = require("mongoose");

const Product = require("../models/Product");
const User = require("../models/User");

const router = express.Router();

const getProducts = async (req, res, next) => {
  const product = await Product.find();
  res.status(200).json({ message: "Reached", product });
};

const addProducts = async (req, res, next) => {
  const { name, price, description, summary, quantity } = req.body;
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    console.log("no user forund");
  }

  if (!user.isAdmin) {
    return;
  }

  const product = new Product({
    name,
    price,
    description,
    summary,
    quantity,
    // image,
  });

  await product.save();

  res.json({ product });
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  res.json(product);
};

const addToCart = async (req, res, next) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const { userId } = req.body;
  const user = await User.findById(userId);

  if (!product) {
    console.log("no product found");
  }

  if (!user.isAdmin) {
    return;
  }

  const productAtIndex = user.cart.findIndex((item) =>
    item.product.equals(product._id)
  );
  if (productAtIndex > -1) {
    user.cart[productAtIndex].quantity += 1;
  } else {
    user.cart.push({ product: product._id, quantity: 1 });
  }

  await user.save();
  await user.populate("cart.product");
  res.json("added to cart");
};

const removeFromCart = (req, res, next) => {
  const { id } = req.params;
  const { userId } = req.body;

  const user = User.findById(userId);
  user.cart = user.cart.filter((product) => product._id !== id);
  user.save();
};

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/addProduct/:id", addProducts);
router.post("/addtoCart/:id", addToCart);
router.post("/removefromcart/:id", removeFromCart);

module.exports = router;
