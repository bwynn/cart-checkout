// models/order.js

// packages ====================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductQuantity = require('./quantity');
var Address = require('./address');
var Billing = require('./billing');
var Quantity = require('./quantity');

// customer schema ================================================================
var CustomerSchema = new Schema({
  userid: {type: String, unique: true, required: true},
  shipping: [Address.schema],
  billing: [Billing.schema],
  cart: [Quantity.schema]
});

module.exports = mongoose.model('Customer', CustomerSchema);
