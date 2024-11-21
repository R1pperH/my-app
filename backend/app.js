const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./routes/places-routes");
const userRouter = require("./routes/user-routes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/products", router);
app.use("/api/users", userRouter);
mongoose
  .connect(
    `mongodb+srv://harshfn0207:aVXO0vct2CMjpoSn@shoplu.kk5ff.mongodb.net/shop`
  )
  .then(() => console.log("Connected to database"));
app.listen(5000);
