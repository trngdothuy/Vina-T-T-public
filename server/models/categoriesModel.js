const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  price: { type: Number },
  color: { type: String },
  description: { type: String },
  nutrients: {type: Array},
  manufacturer: { type: String },
  plantation: { type: String},
  photo: {type: String},
  testimonial1: {type: String},
  testimonial_name1: {type: String},
  testimonial_photo1: {type: String},
  testimonial2: {type: String},
  testimonial_photo2: {type: String},
  testimonial_name2: {type: String},
  testimonial3: {type: String},
  testimonial_name3: {type: String},
  testimonial_photo3: {type: String},
});

module.exports = mongoose.model("categories", categorySchema);
