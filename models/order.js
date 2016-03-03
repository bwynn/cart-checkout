// models/order.js

// packages ====================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductQuantity = require('./quantity');
var Address = require('./address');
var Billing = require('./billing');

// order schema ================================================================
var OrderSchema = new Schema({
  userid: String,
  items: [ProductQuantity.schema],
  shipping: [Address.schema],
  billing: [Billing.schema],
  status: {type: String, default: 'Pending'},
  timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Order', OrderSchema);
