angular.module('controllers')
.controller('ConsultationControleur', ['$rootScope','$scope','$http','$routeParams','$location', 'Get',
function ($rootScope, $scope,  $http, $routeParams, $location, Get) {
  console.log("Consult");

  $scope.survey = $rootScope.actualSurvey.data;

  console.log($scope.survey);

  $scope.titleSurvey = $scope.survey.survey.suDescription;
  $scope.dateSurvey = $scope.survey.survey.suExpirationdate;

  $scope.listChoice = {};

  $scope.listChoice = $scope.survey.choiceList;

}]);
