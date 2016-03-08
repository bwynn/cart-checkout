var mongoose = require('mongoose');
var Product = require('../models/product');

exports.getProduct = function(req, res) {
  Product.findOne({_id: req.query.productId}, function(err, product) {
    if (err) {
      res.send(err);
    }

    res.json(product);
  });
};

exports.getProducts = function(req, res) {
  Product.find().then(function(err, products) {
    if (err) {
      res.send(err);
    }

    res.json(products);
  });
};
