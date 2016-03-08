var express = require('express');
var path = require('path');

module.exports = function(app) {
  var customers = require('./controllers/customers_controller');
  var products = require('./controllers/products_controller');
  var orders = require('./controllers/orders_controller');

  app.get('api/', function(req, res) {
    res.json({msg: 'shopping'});
  });

  app.get('/products/get', products.getProducts);
  app.get('/orders/get', orders.getOrders);
  app.post('/orders/add', orders.addOrder);
  app.get('/customers/get', customers.getCustomer);
  app.post('/customers/update/shipping', customers.updateShipping);
  app.post('/customers/update/billing', customers.updateBilling);
  app.post('/customers/update/cart', customers.updateCart);

  // front end routes
  app.get('*', function(req, res, next) {
    res.sendFile(path.join(__dirname + "/public/views/shopping.html"));
  })
};
