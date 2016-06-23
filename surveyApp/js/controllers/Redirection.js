angular.module('controllers')
.controller('RedirectionCtrl', ['$rootScope','$scope','$http','$routeParams','$location', 'Get',
function ($rootScope, $scope,  $http, $routeParams, $location, Get) {


    //Get.surveyFromMD5($routeParams.surveyMD5).then(function(obj){

        //  $rootScope.survey = obj;

          //idSondage -> vote
          //idRéponse -> edit réponse
          console.log("RedirectionCtrl");
          console.log($routeParams.surveyMD5);

          switch ($routeParams.surveyMD5)
          {
            case "MD5Admin":
              $location.path("/admin");
              break;
            case "MD5Result":
              $location.path("/result");
              break;
            case "MD5ReadWrite":
              $location.path("/consultation");
              break;
          }
  //  });
}]);
