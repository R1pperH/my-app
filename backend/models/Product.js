const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const productSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  name: {
    type: String,
    required: true,
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
