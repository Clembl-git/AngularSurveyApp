angular.module('controllers')
.controller('AdminControlleur', ['$rootScope','$scope','$http','$routeParams','$location', 'Get',
function ($rootScope, $scope,  $http, $routeParams, $location, Get) {
  console.log("AdminControleur");

  loadDatepicker();

  $scope.survey = $rootScope.surveyFromMD5;

  console.log($scope.survey);

  $scope.inputTitle = $scope.survey.survey.suTitle;
  $scope.inputDateExpiration = $scope.survey.survey.suExpirationdate;
  $scope.inputDescription = $scope.survey.survey.suDescription;

  $scope.bEmailOnParticipe = $scope.survey.survey.suEmailonparticipation;
  $scope.bEmailOnReponse = $scope.survey.survey.suEmailoncomment;
  $scope.bVoteEditable = $scope.survey.survey.suIsvoteeditable;
  $scope.bResultPublic = $scope.survey.survey.suIsresultpublic;


  $scope.listReponse = [];
  angular.forEach($scope.survey.choiceList, function(choice, i) {

      Get.listReponses(choice.chIdchoice)
      .then(function(listReponse) {
        console.log(listReponse);
        angular.forEach(listReponse.data, function (response, key)
        {

          console.log(response);
          response.chIdchoice = response.chIdchoice.chIdchoice;
          $scope.listReponse.push(response);
        })
        console.log($scope.listReponse);
      })
  });


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
        Get.createSurvey($scope.newSurvey)
        .then(function() {

        })
      }
      else{
          toastr.error("Les champs Titre, Description et Date d'expiration sont obligatoire !", "Manque d'informations");
      }
  };
}]);
