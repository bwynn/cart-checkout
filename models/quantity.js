// models/quantity.js

// packages ====================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Product = require('./product');

// quantity schema =============================================================
var ProductQuantitySchema = new Schema({
  quantity: Number,
  product: [Product.schema]
}, {_id: false});

module.exports = mongoose.model('ProductQuantity', ProductQuantitySchema);
