const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  description: { type: String, required: true },
  nutrients: {type: String,required: true},
  manufacturer: { type: String, required: true },
  plantation: { type: String, required: true },
});

module.exports = mongoose.model("category", categorySchema);
