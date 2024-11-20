const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const userSchema = new Schema({
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: { type: Number, default: 1 },
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
