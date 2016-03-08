var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/cart');
//require('./models/cart_model.js');
var Address = require('./models/address');
var Billing = require('./models/billing');
var Product = require('./models/product');
var ProductQuantity = require('./models/quantity');
var Order = require('./models/order');
var Customer = require('./models/customer');

function addProduct(customer, order, name, imagefile, price, description, instock) {
  var product = new Product({
    name: name,
    imagefile: imagefile,
    price: price,
    description: description,
    instock: instock
  });

  product.save(function(err, results) {
    order.items.push(new ProductQuantity({quantity: 1, product: [product]}));
    order.save();
    customer.save();
    console.log("Product " + name + " Saved.");
  });
}

Product.remove().exec(function() {
  Order.remove().exec(function() {
    Customer.remove().exec(function() {
      var shipping = new Address({
        name: "Customer A",
        address: 'Somewhere',
        city: 'My Town',
        state: "CA",
        zip: '55555'
      });

      var billing = new Billing({
        cardtype: "Visa",
        name: 'Customer A',
        number: '1234569540',
        expiremonth: 1,
        expireyear: 2020,
        address: shipping
      });
      var customer = new Customer({
        userid: 'customerA',
        shipping: shipping,
        billing: billing,
        cart: []
      });
      customer.save(function(err, result) {
        var order = new Order({
          userid: customer.userid,
          items: [],
          shipping: customer.shipping,
          billing: customer.billing
        });
        order.save(function(err, result) {
          addProduct(customer, order, 'Delicate Arch Print', 'arch.jpg', 12.34, 'View the breathtaking Delicate Arch in Utah', Math.floor((Math.random()*10) +1));
          addProduct(customer, order, 'Volcano Print', 'volcano.jpg', 45.45, 'View of a tropical lake backset by a volcano', Math.floor((Math.random()*10) +1));
          addProduct(customer, order, 'Tikal Structure Print', 'pyramid.jpg', 38.52, 'Look at the amazing architecture of early America.', Math.floor((Math.random()*10)+1));
          addProduct(customer, order, 'Glacial Lake Print', 'lake.jpg', 77.45, 'Vivid color, crystal clear water from glacial runoff.', Math.floor((Math.random()*10) + 1));
        });
      })
    });
  });
});
