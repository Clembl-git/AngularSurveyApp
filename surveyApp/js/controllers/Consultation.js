angular.module('controllers')
.controller('ConsultationControleur', ['$rootScope','$scope','$http','$routeParams','$location', 'Get','toastr',
function ($rootScope, $scope,  $http, $routeParams, $location, Get, toastr) {
  console.log("Consult");

  $scope.survey = $rootScope.surveyFromMD5;

  //DEBUG
  if($scope.survey != undefined) {

    //$scope.survey.idReponse = 17;
    if($scope.survey.idReponse != 0)
      $scope.isInEdition = true;


    console.log($scope.survey);
    $scope.titleSurvey = $scope.survey.survey.suTitle;
    $scope.dateSurvey = $scope.survey.survey.suExpirationdate;
    $scope.listChoice = [];
    $scope.listChoice = $scope.survey.choiceList;

    setTimeout(function () {
      setlistener();
    }, 1000);

    console.log($scope.listChoice);

    $scope.choiceSelected;
    $scope.user = {};
    $scope.listReponse = [];


    angular.forEach($scope.listChoice, function(choice, i) {

        Get.listReponses(choice.chIdchoice)
        .then(function(listReponse) {
          angular.forEach(listReponse.data, function (response, key)
          {
            response.chIdchoice = response.chIdchoice.chIdchoice;
            if($scope.survey.idReponse == response.reIdresponse) {
              response.canEdit= true;
              console.log("CAN EDIT");
            }
            else
              response.canEdit = false;
            $scope.listReponse.push(response);
          })
          console.log($scope.listReponse);
        })
    });
  }

  $scope.editResponse = function(idRep, idChoice, name){
  var jsonObj = {
    "chIdchoice": {"chIdchoice":idChoice.toString()},
    "reIdresponse" : idRep.toString(),
    "reNameparticipant": name
  };
  console.log(jsonObj);
  Get.editResponse(jsonObj).then(function(resp){
    console.log(resp);
    toastr.success("Choix modifié","Succès");
  }, function(){
    toastr.error("Erreur lors de la sauvegarde du nouveau choix","Erreur");
  });

  }

  $scope.enableChkbox = function(){
    $('.chkBoxGroup').each(function(index){
      $(this).removeAttr("disabled");
    });
  }
  $scope.onClickRegister = function()
  {
      var idCheckBox = $('.chkBoxGroup:checked').val();
      console.log(idCheckBox);
      console.log("onClickRegister");
      if ($scope.user.name != undefined && $scope.user.email != undefined && idCheckBox != undefined)
      {
          console.log($scope.user.name);
          jsonObj = {
             "reponse": {
             "reNameparticipant": $scope.user.name,
	           "chIdchoice": {"chIdchoice":idCheckBox}
           }, "mailParticipant": $scope.user.email};

           jsonObj = JSON.stringify(jsonObj);

           Get.addResponseToSurvey(jsonObj)
           .then(function() {
              toastr.success("Réponse ajouté","Succès");
           }, function(){
             toastr.error("Erreur dans l'ajout de la réponse","Echec");
           })
      }
  }
}]);


function setlistener() {

  $('.chkBoxGroup').on('change', function() {
    $('.chkBoxGroup').not(this).prop('checked', false);
    $(this).removeClass('emptycheck');
    $(this).addClass('check');
});
$('.chkBoxGroupEdit').on('change', function() {
  $('.chkBoxGroupEdit').not(this).prop('checked', false);
  $(this).removeClass('emptycheck');
  $(this).addClass('check');
});
}
