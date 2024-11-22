const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    required: true,
    default: "",
  },

  price: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  summary: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    default: 50,
  },
});

module.exports = mongoose.model("Product", productSchema);
