const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose
  .connect(
    `mongodb+srv://harshfn0207:aVXO0vct2CMjpoSn@shoplu.kk5ff.mongodb.net/`
  )
  .then(() => console.log("Connected to database"));
app.listen(5000);
