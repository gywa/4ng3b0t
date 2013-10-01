var demoApp = angular.module('demo', ['ui.bootstrap', 'ngAnimate']);

demoApp.controller("main", function($scope){
  $scope.active = true;

  $scope.mylist = [1,2,3,4,5,6,7,8,9];

  $scope.addToList = function(){
    $scope.mylist.push($scope.mylist[$scope.mylist.length - 1] + 1);
  };

  $scope.updateTodos = function(){

    hoodie.store.findAll('todo').then( function(todos) {
      $scope.todos = todos;
    });
  };

  $scope.removeFromList = function(item){
    var index = $scope.mylist.indexOf(item);
    $scope.mylist.splice(index, 1);
  };

  $scope.toggleActive = function(){
    $scope.active = !$scope.active;
  };

  $scope.alertMe = function(){
    alert("wurde ausgewählt");
  };
});
