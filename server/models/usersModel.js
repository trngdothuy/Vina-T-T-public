const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  password2: { type: String, required: true},
  name:  { type: String, required: true },
  dob:  { type: Date },
  address: { type: String},
  phone_number:  { type: Number},
  favorite: {type: Array},
  order_history: { type: Array},
});

module.exports = mongoose.model("users", userSchema);