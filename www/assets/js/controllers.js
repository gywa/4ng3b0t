//'use strict';

/* Controllers */

function RestaurantListCtrl($scope, $http) {

  //$http.get('restaurantApps/restaurants.json').success(function(data) {
  //  $scope.restaurants = data;
  //});
  $scope.loadRestaurants = function(){

    // initial load of all items from the store
    hoodie.store.findAll('restaurant').then( function(restaurants) {
      $scope.restaurants    = restaurants;
    });
  };


  $scope.createSampleRestaurants = function(){

    // just create some data to work with
    var sampleRestaurants = [

      { "name":   "Maharadscha", "city": "Dresden",   "desc": "Indische Spezialitäten",
        "offers": [{ "desc": "Linsensuppe",           "time": "mittags" },
                   { "desc": "Curry aus Delhi",       "time": "abends"  }]},

      { "name":   "Little Italy", "city": "Radebeul", "desc": "Wie in Italien!",
        "offers": [{ "desc": "rote Nudeln",           "time": "mittags" },
                   { "desc": "Pizza Speziale",        "time": "abends"  }]},

      { "name":   "Stadtwirtschaft", "city": "Freiberg", "desc": "Ursächsisches!",
        "offers": [{ "desc": "Bauernfruehstueck",     "time": "morgens" },
                   { "desc": "Tafelspitz",            "time": "mittags" },
                   { "desc": "Rostbraten",            "time": "abends"  }]}
    ];

    $scope.restaurants = sampleRestaurants;
  }

/*  // when a new item gets stored, add it to the UI
  hoodie.store.on('add:restaurant',    $scope.loadRestaurants);
  hoodie.store.on('update:restaurant', $scope.loadRestaurants);
  hoodie.store.on('remove:restaurant', $scope.loadRestaurants);
*/
  //$scope.loadRestaurants();
  $scope.createSampleRestaurants();
};

function RestaurantDetailCtrl($scope, $routeParams) {
  $scope.restaurantId = $routeParams.restaurantId;
}


myApp.controller('RestaurantListCtrl',   ['$scope', '$http',        RestaurantListCtrl]);
myApp.controller('RestaurantDetailCtrl', ['$scope', '$routeParams', RestaurantDetailCtrl]);
