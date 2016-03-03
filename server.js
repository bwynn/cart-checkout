// packages ====================================================================
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
require('./models/address');
require('./models/billing');
require('./models/order');
require('./models/product');
require('./models/quantity');

// configurations ==============================================================
var port = process.env.PORT || 8080; // set port
var db = mongoose.connect('mongodb://localhost/cart'); // connect to db

// body parser
app.use(bodyParser.json());

// set static files location
app.use(express.static(__dirname + '/public'));

// routes ======================================================================
require('./routes')(app);

// server ======================================================================
app.listen(port);

console.log("Server running on port " + port);

exports = module.exports = app;
