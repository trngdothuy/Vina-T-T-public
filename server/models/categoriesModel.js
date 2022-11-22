const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  price: { type: Number },
  color: { type: String },
  description: { type: String },
  nutrients: {type: String},
  manufacturer: { type: String },
  plantation: { type: String},
  photo: {type: String}
});

module.exports = mongoose.model("categories", categorySchema);
