const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  priceInDollar: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imageUrls: [String],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
