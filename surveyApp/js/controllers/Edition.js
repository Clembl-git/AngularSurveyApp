angular.module('controllers')
.controller('EditionControlleur', ['$rootScope','$scope','$http','$routeParams','$location', 'Get', 'SurveyManager',
function ($rootScope, $scope,  $http, $routeParams, $location, Get, SurveyManager) {
  console.log("EditionControlleur");

  loadDatepicker();

  console.log(SurveyManager.getSurvey());

  Get.getSurveyFromMD5($routeParams.surveyMD5)
  .then(function(survey) {
      $scope.survey = survey;

      $scope.inputTitle = survey.suTitle;
      $scope.inputDateExpiration = survey.suExpirationdate;
      $scope.inputDescription = survey.suDescription;

      $scope.bEmailOnParticipe = survey.bEmailOnParticipe;
      $scope.bEmailOnReponse = survey.bEmailOnReponse;
      $scope.bVoteEditable = survey.bVoteEditable;
      $scope.bResultPublic = survey.bResultPublic;
  })

  $scope.mettreAJour = function ()
  {
      if ($scope.inputTitle != undefined && $scope.inputDateExpiration != undefined && $scope.inputDescription != undefined)
      {
        $scope.newSurvey = {
        "suTitle"               : $scope.inputTitle,
        "suDescription"         : $scope.inputDescription,
        "suSurveytype"          : $scope.survey.typeSurvey,
        "suExpirationdate"      : $scope.inputDateExpiration,
        "suIsvoteeditable"      : $scope.bVoteEditable != undefined ? $scope.bVoteEditable.toString() : '0',
        "suEmailoncomment"      : $scope.bEmailOnReponse != undefined ? $scope.bEmailOnReponse.toString() : '0',
        "suIsresultpublic"      : $scope.bResultPublic != undefined ? $scope.bResultPublic.toString() : '0',
        "suEmailonparticipation": $scope.bEmailOnParticipe != undefined ? $scope.bEmailOnParticipe.toString() : '0',
        "usIduser"              : $scope.usIduser
        };

        console.log($scope.newSurvey);
        /*Get.createSurvey($scope.newSurvey)
        .then(function() {

        })*/
      }
      else{
          toastr.error("Les champs Titre, Description et Date d'expiration sont obligatoire !", "Manque d'informations");
      }
  };

}]);
