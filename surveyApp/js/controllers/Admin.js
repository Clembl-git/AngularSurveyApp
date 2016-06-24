angular.module('controllers')
.controller('AdminControlleur', ['$rootScope','$scope','$http','$routeParams','$location', 'Get', 'toastr',
function ($rootScope, $scope,  $http, $routeParams, $location, Get, toastr) {
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

  $scope.editResponse = function(idRep, idChoice, name, id)
  {
    var jsonObj = {
    "chIdchoice": {"chIdchoice":idChoice.toString()},
    "reIdresponse" : idRep.toString(),
    "reNameparticipant": name
  };

  console.log(jsonObj);

  Get.editResponse(jsonObj).then(function(resp){
    console.log(resp);
    toastr.success("Choix modifié","Succès");
  }, function() {
    toastr.error("Erreur lors de la sauvegarde du nouveau choix","Erreur");
  });
  }

  $scope.mettreAJour = function ()
  {
      if ($scope.inputTitle != undefined && $scope.inputDateExpiration != undefined && $scope.inputDescription != undefined)
      {
        $scope.newSurvey = {
        "idSurvey"              : $scope.survey.survey.suIdsurvey,
        "suTitle"               : $scope.inputTitle,
        "suDescription"         : $scope.inputDescription,
        "suSurveytype"          : $scope.survey.typeSurvey,
        "suExpirationdate"      : $scope.inputDateExpiration,
        "suIsvoteeditable"      : $scope.bVoteEditable != undefined ? $scope.bVoteEditable.toString() : '0',
        "suEmailoncomment"      : $scope.bEmailOnReponse != undefined ? $scope.bEmailOnReponse.toString() : '0',
        "suIsresultpublic"      : $scope.bResultPublic != undefined ? $scope.bResultPublic.toString() : '0',
        "suEmailonparticipation": $scope.bEmailOnParticipe != undefined ? $scope.bEmailOnParticipe.toString() : '0',
        "usIduser"              : $scope.survey.survey.usIduser
        };

        console.log($scope.newSurvey);

        var jsonObj = {
          "suIdsurvey"              : $scope.newSurvey.idSurvey,
          "suTitle"               : $scope.newSurvey.suTitle,
          "suDescription"         : $scope.newSurvey.suDescription,
          "suSurveytype"          : $scope.newSurvey.suSurveytype,
          "suExpirationdate"      : $scope.newSurvey.suExpirationdate,
          "suIsvoteeditable"      : $scope.newSurvey.suIsvoteeditable != undefined ? $scope.bVoteEditable.toString() : '0',
          "suEmailoncomment"      : $scope.newSurvey.suEmailoncomment != undefined ? $scope.bEmailOnReponse.toString() : '0',
          "suIsresultpublic"      : $scope.newSurvey.suIsresultpublic != undefined ? $scope.bResultPublic.toString() : '0',
          "suEmailonparticipation": $scope.newSurvey.suEmailonparticipation != undefined ? $scope.bEmailOnParticipe.toString() : '0',
          "usIduser"              : $scope.survey.survey.usIduser,
          "suSurveytype"          : $scope.survey.survey.suSurveytype
        };

        jsonObj = JSON.stringify(jsonObj);

        console.log(jsonObj);

        Get.editSurvey(jsonObj)
        .then(function() {

          toastr.success("Le sondage a bien été mis à jour", "Validation");
        })
      }
      else{
          toastr.error("Les champs Titre, Description et Date d'expiration sont obligatoire !", "Manque d'informations");
      }
  };
}]);
