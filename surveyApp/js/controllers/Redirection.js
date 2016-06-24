angular.module('controllers')
.controller('RedirectionCtrl', ['$rootScope','$scope','$http','$routeParams','$location', 'Get',
function ($rootScope, $scope,  $http, $routeParams, $location, Get) {


    console.log($scope.survey);


    angular.foreach
    //Get.surveyFromMD5($routeParams.surveyMD5).then(function(obj){

          $rootScope.surveyMD5 = $routeParams.surveyMD5;

          //idSondage -> vote
          //idRéponse -> edit réponse
          console.log("RedirectionCtrl");
          console.log($routeParams.surveyMD5);

          Get.getSurveyFromMD5($routeParams.surveyMD5)
          .then(function(survey){
            console.log(survey);
            $rootScope.actualSurvey = survey;


            /*switch (survey.typeAccess)
            {
              case "MD5Admin":
                $location.path("/admin");
                break;
              case "MD5Result":
                $location.path("/result");
                break;
              case "MD5ReadWrite":*/
                $location.path("/result");
                //break;
            //}
          })
}]);
