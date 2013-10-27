//'use strict';

/* App Module */

/*
var myApp = angular.module('restaurantsApp', ['ui.bootstrap', 'ngRoute']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/restaurants',                {templateUrl: 'assets/partials/restaurant-list.html',   controller: 'RestaurantListCtrl'}).
      when('/restaurants/:restaurant.id', {templateUrl: 'assets/partials/restaurant-detail.html', controller: 'RestaurantDetailCtrl'}).
      otherwise                          ({redirectTo: '/restaurants'});
}]);
*/
var angeboteApp = angular.module('angeboteApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate','ui.bootstrap.datepicker']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/restaurant',               {templateUrl: 'assets/partials/restaurant-list.html',   controller: 'RestaurantListCtrl'  }).
      when('/restaurant/:restaurantId', {templateUrl: 'assets/partials/restaurant-detail.html', controller: 'RestaurantDetailCtrl'}).
      otherwise                        ({redirectTo:  '/restaurant'});
}]);

angeboteApp.controller('RestaurantListCtrl',   ['$scope',                 RestaurantListCtrl]);
angeboteApp.controller('RestaurantDetailCtrl', ['$scope', '$routeParams', RestaurantDetailCtrl]);


// initialize Hoodie
var hoodie  = new Hoodie();
