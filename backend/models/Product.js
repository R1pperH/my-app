const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },

  // image: {
  //   type: String,
  //   required: true,
  //   default:
  //     "https://imgs.search.brave.com/ClOqtr3JMl6Am3AkqL-qThwuPQq1gBPYStiUXX-r1ws/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTM2/MjYyNTgxOC9waG90/by9wcm9kdWN0LXBv/ZGl1bS1zdGFnZS1m/b3ItbW9ja3VwLXBy/ZXNlbnRhdGlvbi1j/b25jcmV0ZS1tZXRh/bC10ZXh0dXJlLWJh/Y2tncm91bmQuanBn/P2I9MSZzPTE3MDY2/N2Emdz0wJms9MjAm/Yz1QejZHUWVUSWNU/Nk90M0FYYjNEalpQ/REdLSWZyekZlMmY2/UkRocUtxZ2swPQ",
  // },

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
