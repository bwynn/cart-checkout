// models/product.js

// packages ====================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// product schema ==============================================================
var ProductSchema = new Schema({
  name: String,
  imagefile: String,
  description: String,
  price: Number,
  instock: Number
});

module.exports = mongoose.model("Product", ProductSchema);
