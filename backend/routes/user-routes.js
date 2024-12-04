const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");

const makeUser = async (req, res, next) => {
  console.log(req.body);
  const { username, email, password, confirmPassword, isAdmin } = req.body;
  try {
    const user = await User.findOne({ email: email });

    if (user) {
      console.log("user with this id already exist");
    }

    if (password !== confirmPassword) {
      console.log("Passwords dont match");
    }

    const hashedPw = await bcrypt.hash(password, 12);

    const mkUser = new User({
      username,
      email,
      password: hashedPw,
      isAdmin,
    });

    let token;
    try {
      token = jwt.sign(
        { userId: mkUser._id, isAdmin: mkUser.isAdmin },
        "top_secret",
        {
          expiresIn: "1h",
        }
      );
    } catch (err) {
      console.log(err);
    }

    await mkUser.save();
    res.json({ message: "user created", userId: mkUser._id, token: token });
  } catch (err) {
    console.log(err);
  }
};

const logInUser = async (req, res, next) => {
  const { email, passowrd } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("No user Please log in");
      return;
    }

    const validPw = await bcrypt.compare(passowrd, user.password);

    if (!validPw) {
      console.log("Credentials not right");
      return;
    }

    const token = jwt.sign(
      { userId: user._id, isAdmin: user.isAdmin },
      "top_secret",
      { expiresIn: "1h" }
    );

    res.json({ token: token, userId: user._id });
  } catch (err) {
    console.log(err);
  }
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
