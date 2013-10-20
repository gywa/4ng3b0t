//'use strict';

var angeboteApp = angular.module('angeboteApp', ['ngRoute', 'ui.bootstrap', 'ngAnimate','ui.bootstrap.datepicker']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/restaurant',     {templateUrl: 'assets/partials/restaurant-list.html',   controller: 'RestaurantListCtrl'}).
  when('/restaurant/:restaurantId', {templateUrl: 'assets/partials/restaurant-detail.html', controller: 'RestaurantDetailCtrl'}).
      otherwise({redirectTo: '/restaurant'});
}]);


angeboteApp.controller("main", function($scope){


  // ___________ TOREMIND: old staff ___________
  //
  $scope.active = true;
  $scope.angebote = [1,2,3,4,5,6,7,8,9];

  $scope.addToList   = function(){$scope.angebote.push($scope.angebote[$scope.angebote.length - 1] + 1);};
  $scope.updateTodos = function(){hoodie.store.findAll('todo').then( function(todos) {$scope.todos = todos;});};
  $scope.removeFromList = function(item){var index   = $scope.angebote.indexOf(item);$scope.angebote.splice(index, 1);};
  $scope.showSelected   = function(item){var angebot = $scope.angebote[item];alert("Angebot " + item + " wurde ausgewählt");};
  $scope.toggleActive = function(){$scope.active = !$scope.active;};
  $scope.alertMe      = function(){alert("wurde ausgewählt");};

});

// initialize Hoodie
var hoodie  = new Hoodie();

function RestaurantListCtrl($scope) {


  // ======================== Restaurants ========================

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
    hoodie.store.add( 'restaurant', sampleRestaurants[0]);
    hoodie.store.add( 'restaurant', sampleRestaurants[1]);
    hoodie.store.add( 'restaurant', sampleRestaurants[2]);

    //$scope.restaurants = sampleRestaurants;
    $scope.mode = 'showRestaurants';

  };

  // when a new item gets stored, add it to the UI
  hoodie.store.on('add:restaurant',    $scope.loadRestaurants);
  hoodie.store.on('update:restaurant', $scope.loadRestaurants);
  hoodie.store.on('remove:restaurant', $scope.loadRestaurants);

  $scope.loadRestaurants();
  //$scope.createSampleRestaurants();

  $scope.newRestaurant    = function()    { $scope.currRestaurant = {};                 $scope.mode = 'createRestaurant'; };
  $scope.editRestaurant   = function(item){ $scope.currRestaurant = angular.copy(item); $scope.mode = 'editRestaurant';   };
  $scope.deleteRestaurant = function(item){ hoodie.store.remove('restaurant',item.id);  $scope.mode = 'showRestaurants';  };
  $scope.showOffers       = function(item){ $scope.currRestaurant = item;               $scope.mode = 'showOffers';       };
  $scope.loadRestaurants  = function()    { hoodie.store.findAll('restaurant').then( function(restaurants) { $scope.restaurants = restaurants; }); };
  $scope.updateRestaurant = function(item){ if($scope.restaurantForm.$valid){ hoodie.store.update( 'restaurant', item.id, item); } else { alert("korrigiere!"); }};
  $scope.resetRestaurant  = function()    { $scope.currRestaurant = {};                     };

  $scope.addRestaurant    = function(item){
      if($scope.restaurantForm.$valid){

          hoodie.store.add( 'restaurant', item);
          $scope.resetRestaurant();

      } else { $scope.warn(); }
  };
  $scope.saveRestaurant    = function(item){
      if($scope.restaurantForm.$valid){

        if ($scope.mode == 'createRestaurant')
             { hoodie.store.add   ( 'restaurant', item); }
        else { hoodie.store.update( 'restaurant', $scope.currRestaurant.id, $scope.currRestaurant); } // ok?
        $scope.resetRestaurant();
        $scope.mode = 'showRestaurants';

      } else { $scope.warn(); }
  };


};

function RestaurantDetailCtrl($scope, $routeParams) {
  $scope.restaurantId = $routeParams.restaurantId;


  // ======================== allgemeine Methoden (generisch/Typ als Parameter) ============

  $scope.delete = function(item, type){ hoodie.store.remove(type, item.id); };
  $scope.warn   = function()          { alert("Bitte fuellen Sie alle Felder korrekt aus!"); };


  // ======================== Offers ====================================

  $scope.loadOffers = function(){ hoodie.store.findAll('offer').then( function(offers) { $scope.offers = offers; }); };

  // when a new offer gets stored, add it to the UI
  hoodie.store.on('add:offer',    $scope.loadOffers);
  hoodie.store.on('update:offer', $scope.loadOffers);
  hoodie.store.on('remove:offer', $scope.loadOffers);

  $scope.loadOffers();


  $scope.newOffer    = function()    { $scope.offer = {}; $scope.mode = 'createOffer';   };
  $scope.addOffer    = function(item){ if($scope.offerForm.$valid){ hoodie.store.add   ( 'offer', item); $scope.resetOffer(); } else { alert("korrigiere!"); }};
  $scope.updateOffer = function(item){ if($scope.offerForm.$valid){ hoodie.store.update( 'offer', item.id, item); } else { alert("korrigiere!"); }};
  //$scope.editOffer   = function(item){ $scope.offer = angular.copy(item); $scope.mode = 'editOffer';    };
  $scope.editOffer   = function(item){ $scope.offer = item; $scope.mode = 'editOffer';    };
  $scope.resetOffer  = function()    { $scope.offer = {};                     };
  $scope.deleteOffer = function(item){ hoodie.store.remove('offer', item.id); $scope.resetOffer(); };

  $scope.saveOffer    = function(item){
      if($scope.offerForm.$valid){

        if ($scope.mode == 'createOffer')
        { $scope.currRestaurant.offers.push(item); }
        else { hoodie.store.update( 'restaurant', $scope.currRestaurant.id, $scope.currRestaurant); } // ok?
        $scope.resetOffer();
        $scope.mode = 'editRestaurant';

      } else { $scope.warn(); }
  };
};



angeboteApp.controller('RestaurantListCtrl',   ['$scope',                 RestaurantListCtrl]);
angeboteApp.controller('RestaurantDetailCtrl', ['$scope', '$routeParams', RestaurantDetailCtrl]);
// REMINDS:

// within css: ng-cloak to avoid flickering/predisplaying ...[ng\:cloak], [ng-cloak], .ng-cloak {
// within  display: none;
// within}

//var items = [];
//  items.push($scope.restaurant);
