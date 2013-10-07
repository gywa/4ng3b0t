'use strict';

/* App Module */


var myApp = angular.module('restaurantsApp', ['ui.bootstrap']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/restaurants',               {templateUrl: 'partials/restaurant-list.html',   controller: 'RestaurantListCtrl'}).
      when('/restaurants/:restaurantId', {templateUrl: 'partials/restaurant-detail.html', controller: 'RestaurantDetailCtrl'}).
      otherwise({redirectTo: '/restaurants'});
}]);

// initialize Hoodie
var hoodie  = new Hoodie();
