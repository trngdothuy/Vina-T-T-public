const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // name: { type: String, required: true},
  fruit_batch: { type: Number, required: true, unique: true },
  harvest_date:  { type: Date, required: true },
  packaging_date:  { type: Date, required: true },
  farmers_name: { type: String, required: true},
  farmers_photo:  { type: String, required: true},
  videos: {type: String, required: true},
  // category: {
  //   type: mongoose.Schema.Types.String,
  //   required:true,
  //   ref:'categories'
  // }
  category: { type: String, required: true},
});

module.exports = mongoose.model("products", productSchema);
