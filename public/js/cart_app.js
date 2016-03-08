angular.module('myApp', ['ngRoute'])
  .controller('shoppingController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
    $scope.years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];
    $scope.content = '/views/products.html';

    // get requests
    $http.get('/products/get').
      success(function(data, status, headers, config) {
        $scope.products = data;
        $scope.product = data[0];
      }).
      error(function(data, status, headers, config) {
        $scope.products = [];
      });
    $http.get('/customers/get').
      success(function(data, status, headers, config) {
        $scope.customer = data;
      }).
      error(function(data, status, headers, config) {
        $scope.customer = [];
      });
    $http.get('/orders/get').
      success(function(data, status, headers, config) {
        $scope.orders = data;
      }).
      error(function(data, status, headers, config) {
        $scope.orders = [];
      });

    // set content
    $scope.setContent = function(filename) {
      $scope.content = '/views/' + filename;
    };

    // set products
    $scope.setProduct = function(productId) {
      $scope.product = this.product;
      $scope.content = '/views/product.html';
    };

    //cart totals
    $scope.cartTotal = function() {
      var total = 0;
      for (var i = 0; i < $scope.customer.cart.length; i++) {
        var item = $scope.customer.cart[i];
        total += item.quantity * item.product[0].price;
      }

      $scope.shipping = total * 0.05;
      return total + $scope.shipping;
    };

    // add product to cart
    $scope.addToCart = function(productId) {
      var found = false;
      for (var i = 0; i < $scope.customer.cart.length; i++) {
        var item = $scope.customer.cart[i];
        if (item.product[0]._id == productId) {
          item.quantity += 1;
          found = true;
        }
      }
      if (!found) {
        $scope.customer.cart.push({quantity: 1, product: [this.product]});
      }
      $http.post('/customers/update/cart', {updatedCart: $scope.customer.cart})
        .success(function(data, status, headers, config) {
          $scope.content = '/views/cart.html';
        }).
        error(function(data, status, headers, config) {
          $window.alert(data);
        });
    };

    // delete from cart
    $scope.deleteFromCart = function(productId) {
      for (var i = 0; i < $scope.customer.cart.length; i++) {
        var item = $scope.customer.cart[i];
        if (item.product[0]._id == productId) {
          $scope.customer.cart.splice(i, 1);
          break;
        }
      }
      $http.post('/customers/update/cart', {updatedCart: $scope.customer.cart})
        .success(function(data, status, headers, config) {
          $scope.content = '/views/cart.html';
        }).
        error(function(data, status, headers, config) {
          $window.alert(data);
        });
    };

    // checkout
    $scope.checkout = function() {
      $http.post('/customers/update/cart', {updatedCart: $scope.customer.cart})
        .success(function(data, status, headers, config) {
          $scope.content = '/views/shipping.html';
        }).
        error(function(data, status, headers, config) {
          $window.alert(data);
        });
    };

    // set shipping
    $scope.setShipping = function() {
      $http.post('/customers/update/shipping', {updatedShipping: $scope.customer.shipping[0]})
        .success(function(data, status, headers, config) {
          $scope.content = '/views/billing.html';
        }).
        error(function(data, status, headers, config) {
          $window.alert(data);
        });
    };

    // verify billing
    $scope.verifyBilling = function(ccv) {
      $scope.ccv = ccv;
      $http.post('/customers/update/billing', {updatedBilling: $scope.customer.billing[0], ccv: ccv})
        .success(function(data, status, headers, config) {
          $scope.content = '/views/review.html';
        }).
        error(function(data, status, headers, config) {
          $window.alert(data);
        });
    };

    // make purchase
    $scope.makePurchase = function() {
      $http.post('/orders/add', {orderBilling: $scope.customer.billing[0],
                                 orderShipping: $scope.customer.shipping[0],
                                 orderItems: $scope.customer.cart})
           .success(function(data, status, headers, config) {
             $scope.customer.cart = [];
             $http.get('/orders/get')
              .success(function(data, status, headers, config) {
                $scope.orders = data;
                $scope.content = '/views/orders.html';
              }).
              error(function(data, status, headers, config) {
                $scope.orders = [];
              });
           }).
           error(function(data, status, headers, config) {
             $window.alert(data);
           });
    };

  }]);
