// models/address.js

// packages ====================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// address schema ==============================================================
var AddressSchema = new Schema({
  name: String,
  address: String,
  city: String,
  state: String,
  zip: String
}, {_id: false});

module.exports = mongoose.model("Address", AddressSchema);
