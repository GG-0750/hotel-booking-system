const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema({
  name: String,
  location: String,
  price: Number,
  rating: Number,
  imageURL: String,
  reviews: [String],
  description: String,
});

module.exports = mongoose.model("Hotel", hotelSchema);
