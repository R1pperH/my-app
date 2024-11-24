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

const mkAdmin = (req, res, next) => {
  const { id } = req.params;
  const { isAdmin } = req.body;

  const user = User.findById(id);
  const checkAdmin = User.findById(isAdmin);

  if (!checkAdmin.isAdmin) {
    return;
  }

  user.isAdmin = true;
  user.save();
};

const rmvUser = async (req, res, next) => {
  const { id } = req.params;
  const { adminId } = req.body;

  const adminUser = await User.findById(adminId);

  if (!adminUser.isAdmin) {
    return;
  }

  await User.findByIdAndDelete(id);
};

const delUser = (req, res, next) => {
  const { id } = req.params;

  const user = User.findById(id);
  if (!user.isLoggedIn) {
    console.log("cant delete account");
  }

  const deleteUser = User.findByIdAndDelete(id);
  res.json({ message: "deleted" });
};

router.post("/signup", makeUser);

module.exports = router;
