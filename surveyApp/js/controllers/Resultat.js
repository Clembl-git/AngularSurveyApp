angular.module('controllers')
.controller('ResultatCtrl', [ '$scope', '$location',  function($scope, $location) {

  console.log("ResultatCtrl Called");
  console.log($location.path());
  $scope.graph = {};
   $scope.graph.data = [
     [16, 15, 20, 12, 16, 12, 8],
     [16, 15, 20, 12, 16, 12, 8],
     [16, 15, 20, 12, 16, 12, 8],
     [8, 9, 4, 12, 8, 12, 14]
   ];
   $scope.graph.labels = ['Mon', 'Tue', 'Sun'];
   $scope.graph.series = ['Awake', 'Asleep','3','4'];

}]);
