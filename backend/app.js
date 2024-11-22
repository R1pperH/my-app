const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const uplaod = multer();

const router = require("./routes/places-routes");
const userRouter = require("./routes/user-routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/products", uplaod.any(), router);
app.use("/api/users", uplaod.any(), userRouter);
mongoose
  .connect(
    `mongodb+srv://harshfn0207:aVXO0vct2CMjpoSn@shoplu.kk5ff.mongodb.net/shop`
  )
  .then(() => console.log("Connected to database"));
app.listen(5000);
