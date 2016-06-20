angular.module('controllers')
.controller('HomeCtrl', ['$scope','$http','$location', function($scope, $http, $location) {
  console.log("HomeCtrl Called");
    // Form data for the login modal
    $scope.user  = {};
    $scope.createForm = function() {
       $location.path("/creation");
    };
}]);
