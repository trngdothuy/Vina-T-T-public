const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true},
  password: { type: String, required: true},
  name:  String,
  dob:  { type: Date },
  address: { type: String},
  phone_number:  { type: Number},
  favorite: [{product:{type: String}}],
  order_history: [{
    orderNumber: {type: String}, 
    orderProducts:[{prodName: {type: String}, qty: {type: Number}}]}],
  admin: {type: Boolean, default: false},
});

module.exports = mongoose.model("users", userSchema);
