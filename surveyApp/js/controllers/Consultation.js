angular.module('controllers')
.controller('ConsultationControleur', ['$rootScope','$scope','$http','$routeParams','$location', 'Get',
function ($rootScope, $scope,  $http, $routeParams, $location, Get) {
  console.log("Consult");

  $scope.idSurvey;

  Get.getSurveyFromMD5('33f397090d58da33169a45c39ea091f9')
  .then(function(survey){
    console.log(survey);
    $scope.actualSurvey = survey;
  })
}]);
