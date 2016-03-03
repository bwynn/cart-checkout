// models/billing.js

// packages ====================================================================
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Address = require('./address');

// billing schema ==============================================================
var BillingSchema = new Schema({
  cardtype: { type: String, enum: ['Visa', 'MasterCard', 'Amex'] },
  name: String,
  number: String,
  expiremonth: Number,
  expireyear: Number,
  address: [Address.schema]
}, {_id: false});

module.exports = mongoose.model('Billing', BillingSchema);
