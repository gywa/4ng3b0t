var angeboteApp = angular.module('angebote', ['datepicker', 'ui.bootstrap', 'ngAnimate','ui.bootstrap.datepicker']);

angeboteApp.controller("main", function($scope){


  // ___________ TOREMIND: old staff ___________
  //
  $scope.active = true;
  $scope.angebote = [1,2,3,4,5,6,7,8,9];

  $scope.addToList   = function(){$scope.angebote.push($scope.angebote[$scope.angebote.length - 1] + 1);};
  $scope.updateTodos = function(){hoodie.store.findAll('todo').then( function(todos) {$scope.todos = todos;});};
  $scope.removeFromList = function(item){ var index = $scope.angebote.indexOf(item);$scope.angebote.splice(index, 1);};
  $scope.showSelected   = function(item){var angebot = $scope.angebote[item];alert("Angebot " + item + " wurde ausgewählt");};
  $scope.toggleActive = function(){$scope.active = !$scope.active;};
  $scope.alertMe      = function(){alert("wurde ausgewählt");};


});

// initialize Hoodie
var hoodie  = new Hoodie();

angeboteApp.controller("FormDemoCtrl", function($scope){

  // ======================== Restaurants ========================

  $scope.activity = 'show';
  //$scope.loadRestaurants = function(){ hoodie.store.findAll('restaurant').then( function(restaurants) { $scope.restaurants = restaurants; }); };

  $scope.loadRestaurants = function(){

    // initial load of all items from the store
    hoodie.store.findAll('restaurant').then( function(restaurants) {
      $scope.restaurants = restaurants;
      $scope.restaurant  = $scope.restaurants[0];
    });
  };

  // when a new item gets stored, add it to the UI
  hoodie.store.on('add:restaurant',    $scope.loadRestaurants);
  hoodie.store.on('update:restaurant', $scope.loadRestaurants);
  hoodie.store.on('remove:restaurant', $scope.loadRestaurants);

  $scope.loadRestaurants();

  //$scope.restaurant.offers = [];


  $scope.newRestaurant    = function()    { $scope.restaurant = {};                    $scope.mode = 'createRestaurant'; };
  $scope.editRestaurant   = function(item){ $scope.currRestaurant = item; $scope.restaurant = angular.copy(item);    $scope.mode = 'editRestaurant';   };
  $scope.deleteRestaurant = function(item){ hoodie.store.remove('restaurant',item.id); $scope.mode = 'showRestaurants';  };
  $scope.showOffers       = function(item){ $scope.currRestaurant = item;          $scope.mode = 'showOffers';       };
  $scope.loadRestaurants  = function()    { hoodie.store.findAll('restaurant').then( function(restaurants) { $scope.restaurants = restaurants; }); };
  $scope.updateRestaurant = function(item){ if($scope.restaurantForm.$valid){ hoodie.store.update( 'restaurant', item.id, item); } else { alert("korrigiere!"); }};
  $scope.resetRestaurant  = function()    { $scope.restaurant = {}; $scope.currRestaurant = {};                     };

  $scope.addRestaurant    = function(item){
      if($scope.restaurantForm.$valid){

          restaurant.offers = {};
          hoodie.store.add( 'restaurant', item);
          $scope.resetRestaurant();

      } else { warn(); }
  };
  $scope.saveRestaurant    = function(item){
      if($scope.restaurantForm.$valid){

          item.offers = [];
          hoodie.store.add( 'restaurant', item);
          //$scope.resetRestaurant();
          $scope.mode = 'editRestaurant';

      } else { warn(); }
  };


  $scope.createSampleRestaurants    = function(){

    // just create some data to work with
    var sampleRestaurants = [
      {"name": "Pub1", "city": "dresden", "desc": "DescrPub1",
       "offers": [ { "desc": "angebot1", "time": "morgens" },
                   { "desc": "angebot2", "time": "mittags" }
               ] },
      {"name": "Pub2", "city": "freiberg", "desc": "DescrPub2" },
      {"name": "Pub3", "city": "radebeul", "desc": "DescrPub3" }
    ];
    hoodie.store.add( 'restaurant', sampleRestaurants[0]);
    hoodie.store.add( 'restaurant', sampleRestaurants[1]);
    hoodie.store.add( 'restaurant', sampleRestaurants[2]);

    $scope.mode = 'showRestaurants';

  };

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
  $scope.editOffer   = function(item){ $scope.offer = angular.copy(item);     };
  $scope.resetOffer  = function()    { $scope.offer = {};                     };
  $scope.deleteOffer = function(item){ hoodie.store.remove('offer', item.id); };

  $scope.saveOffer    = function(item){
      if($scope.offerForm.$valid){

          $scope.restaurant.offers.push(item);
          $scope.resetOffer();

      } else { warn(); }
  };

});

// REMINDS:

// within css: ng-cloak to avoid flickering/predisplaying ...[ng\:cloak], [ng-cloak], .ng-cloak {
// within  display: none;
// within}

//var items = [];
//  items.push($scope.restaurant);
