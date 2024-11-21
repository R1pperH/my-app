const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

const User = require("../models/User");

const makeUser = async (req, res, next) => {
  const { username, email, password, confirmPassword, isAdmin } = req.body;

  const user = await User.findOne({ email: email });

  if (user) {
    console.log("user with this id already exist");
  }

  if (password !== confirmPassword) {
    console.log("Passwords dont match");
  }

  const mkUser = new User({
    username,
    email,
    password,
    isAdmin,
  });

  await mkUser.save();
  res.json({ message: "user created" });
};

router.post("/signup", makeUser);

module.exports = router;
