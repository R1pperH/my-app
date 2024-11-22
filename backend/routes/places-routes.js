const express = require("express");
const mongoose = require("mongoose");

const Product = require("../models/Product");
const User = require("../models/User");

const router = express.Router();

const getProducts = (req, res, next) => {
  res.status(200).json({ message: "Reached" });
};

const addProducts = async (req, res, next) => {
  const { name, price, description, summary, quantity, image } = req.body;
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
    image,
  });

  await product.save();

  res.json({ product });
};

const getProductById = (req, res, next) => {
  const { id } = req.params;

  const product = Product.findById(id);

  res.json(product);
};

router.get("/", getProducts);
router.post("/addProduct/:id", addProducts);

module.exports = router;
