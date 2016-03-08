var mongoose = require('mongoose');
var Customer = require('../models/customer');
var Order = require('../models/order');
var Address = require('../models/address');
var Billing = require('../models/billing');

exports.getOrder = function(req, res) {
  Order.findOne({_id: req.query.orderId}, function(err, order) {
    if (err) {
      res.send(err);
    }

    res.json(order);
  });
};

exports.getOrders = function(req, res) {
  Order.find({userid: 'customerA'}, function(err, orders) {
    if (err) {
      res.send(err);
    }

    res.json(orders);
  });
};

exports.addOrder = function(req, res) {
  var orderShipping = new Address(req.body.updatedShipping);
  var orderBilling = new Billing(req.body.updatedBilling);
  var orderItems = req.body.orderItems;
  var newOrder = new Order({userid: 'customerA', items: orderItems, shipping: orderShipping, billing: orderBilling});

  newOrder.save(function(err, results) {
    if (err) {
      res.json(500, "Failed to save order.");
    }

    Customer.update({userid: 'customerA'}, { $set: {cart: []}}, function(err, results) {
      if (err) {
        res.send(err);
      }

      res.json({msg: "Order saved."});
    });
  });
};
