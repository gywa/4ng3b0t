var angeboteApp = angular.module('angebote', ['datepicker', 'ui.bootstrap', 'ngAnimate','ui.bootstrap.datepicker']);

angeboteApp.controller("main", function($scope){

  $scope.active = true;

  $scope.angebote = [1,2,3,4,5,6,7,8,9];

  $scope.addToList = function(){
    $scope.angebote.push($scope.angebote[$scope.angebote.length - 1] + 1);
  };

  $scope.updateTodos = function(){

    hoodie.store.findAll('todo').then( function(todos) {
      $scope.todos = todos;
    });
  };

  $scope.removeFromList = function(item){
    var index = $scope.angebote.indexOf(item);
    $scope.angebote.splice(index, 1);
  };

  $scope.showSelected = function(item){
    var angebot = $scope.angebote[item];
    alert("Angebot " + item + " wurde ausgewählt");
  };

  $scope.toggleActive = function(){
    $scope.active = !$scope.active;
  };

  $scope.alertMe = function(){
    alert("wurde ausgewählt");
  };


});

// initialize Hoodie
var hoodie  = new Hoodie();

angeboteApp.controller("FormDemoCtrl", function($scope){


  $scope.add = function(item){
    if($scope.offerForm.$valid){
      hoodie.store.add('offer', item);
      $scope.reset();
    } else {
      alert("korrigiere!");
    }
  };

  $scope.update = function(item){
    if($scope.offerForm.$valid){
      hoodie.store.update('offer', item.id, item);
    } else {
      alert("korrigiere!");
    }
  };

  $scope.updateOffers = function(){
    // initial load of all todo items from the store
    hoodie.store.findAll('offer').then( function(offers) {
      $scope.offers = offers;
    });
  };

  // when a new offer gets stored, add it to the UI
  hoodie.store.on('add:offer', $scope.updateOffers)
  hoodie.store.on('update:offer', $scope.updateOffers)
  hoodie.store.on('remove:offer', $scope.updateOffers)

  $scope.updateOffers();

  $scope.editOffer = function(item){
    $scope.offer = angular.copy(item);
  };

  $scope.deleteOffer = function(item){

    hoodie.store.remove('offer', item.id);
  };

  $scope.reset = function(){

    $scope.offer = {};
  };
});
