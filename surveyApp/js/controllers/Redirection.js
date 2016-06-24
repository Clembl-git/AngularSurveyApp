angular.module('controllers')
.controller('RedirectionCtrl', ['$rootScope','$scope','$http','$routeParams','$location', 'Get','toastr',
function ($rootScope, $scope,  $http, $routeParams, $location, Get, toastr) {

          $rootScope.surveyMD5 = $routeParams.surveyMD5;

          Get.getSurveyFromMD5($routeParams.surveyMD5)
          .then(function(survey) {
            toastr.success("Redirection ...","Succès");

            $rootScope.surveyFromMD5 = survey.data;
            console.log("TYPE : "+survey.data.typeLink);
            console.log($rootScope.surveyFromMD5);
            switch (survey.data.typeLink)
            {
              case "1":
                $location.path("/consultation");
                break;
              case "2":
                $location.path("/consultation");
                break;
              case "3":
                $location.path("/admin");
                break;
              case "4":
                $location.path("/result");
                break;
            }
          }, function(err) {
            toastr.error("Aucun sondage ne correspondant à votre lien privé n'existe","Désolé");
          })
}]);
