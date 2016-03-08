var mongoose = require('mongoose');
var Customer = require('../models/customer');
var Address = require('../models/address');
var Billing = require('../models/billing');

exports.getCustomer = function(req, res) {
  Customer.findOne({userid: "customerA"}, function(err, customer) {
    if (err) {
      res.send(err);
    }

    res.json(customer);
  });
};

exports.updateShipping = function(req, res) {
  var newShipping = new Address(req.body.updateShipping);
  Customer.update({userid: 'customerA'}, {$set: { shipping: [newShipping.toObject()]}}, function(err, results) {
    if (err) {
      res.send(err);
    }

    res.json({msg: "Customer Shipping updated"});
  });
};

exports.updateBilling = function(req, res) {
  // this is where you could verify the credit card information
  // and halt the checkout if it is invalid
  var newBilling = new Billing(req.body.updatedBilling);
  Customer.update({userid: 'customerA'}, {$set: {billing: [newBilling.toObject()]}}, function(err, results) {
    if (err) {
      res.send(err);
    }

    res.json({msg: 'Customer billing updated'});
  });
};

exports.updateCart = function(req, res) {
  Customer.update({userid: 'customerA'}, {$set: {cart: req.body.updatedCart}}, function(err, results) {
    if (err || results < 1) {
      res.send(err);
    }

    res.json({msg: "Customer Cart updated"});
  });
}
