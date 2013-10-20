//'use strict';

/* Controllers */

function RestaurantListCtrl($scope) {

  //$http.get('restaurantApps/restaurants.json').success(function(data) {
  //  $scope.restaurants = data;
  //});

  $scope.loadRestaurants = function(){

    // initial load of all items from the store
    hoodie.store.findAll('restaurant').then( function(restaurants) {
      $scope.restaurants    = restaurants;

      console.log(restaurants);
    });
  };
/*
  $scope.tastes      = {"French",   "Japanese", "German", "Greek",       "Italian"  };
  $scope.atmospheres = {"standard", "fancy",    "hip",    "traditional", "romantic" };

  $scope.selectedTaste      = "Japanese";
  $scope.selectedAtmosphere = "fancy";
*/
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

  // when a new item gets stored, add it to the UI
  hoodie.store.on('add:restaurant',    $scope.loadRestaurants);
  hoodie.store.on('update:restaurant', $scope.loadRestaurants);
  hoodie.store.on('remove:restaurant', $scope.loadRestaurants);

  //$scope.loadRestaurants();
  //$scope.createSampleRestaurants();
  $scope.loadRestaurants();

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

}; // End RestaurantListCtrl

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
        { $scope.restaurantId.offers.push(item); }
        else { hoodie.store.update( 'restaurant', $scope.restaurantId.id, $scope.restaurantId); } // ok?
        $scope.resetOffer();
        $scope.mode = 'editRestaurant';

      } else { $scope.warn(); }
  };
}

