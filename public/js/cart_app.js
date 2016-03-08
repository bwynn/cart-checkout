angular.module('myApp', ['ngRoute'])
  .controller('shoppingController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.months = [1,2,3,4,5,6,7,8,9,10,11,12];
    $scope.years = [2016, 2017, 2018, 2019, 2020, 2021, 2022];
    $scope.content = '/static/products.html';
    $http.get('/products/get').then(function(data) {
      $scope.products = data;
      $scope.product = data[0];
    });
  }]);
