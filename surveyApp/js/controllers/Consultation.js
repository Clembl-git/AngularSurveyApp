angular.module('controllers')
.controller('ConsultationControleur', ['$rootScope','$scope','$http','$routeParams','$location', 'Get',
function ($rootScope, $scope,  $http, $routeParams, $location, Get) {
  console.log("Consult");

  $scope.survey = $rootScope.actualSurvey.data;

  console.log($scope.survey);

  $scope.titleSurvey = $scope.survey.survey.suTitle;
  $scope.dateSurvey = $scope.survey.survey.suExpirationdate;

  $scope.listChoice = [];

  $scope.listChoice = $scope.survey.choiceList;

  setTimeout(function () {

    setlistener();
  }, 2000);

  console.log($scope.listChoice);

  $scope.choiceSelected;
  $scope.user = {};

  $scope.listResponse = [];

  $scope.listChoixRep = [];

  angular.forEach($scope.listChoice, function(choice, i) {

    $scope.listChoixRep[i] = {};
    $scope.listChoixRep[i].chTitle = choice.chTitle;

      Get.getListResponse(choice.chIdchoice)
      .then(function(listReponse) {
        angular.forEach(listReponse.data, function (reponse, key)
        {
          console.log("reponse");
          console.log(reponse.chIdchoice.chIdchoice);
            console.log(choice.chIdchoice);

            $scope.listChoixRep[i].nameParticipant = reponse.reNameparticipant;

            if (choice.chIdchoice == reponse.chIdchoice.chIdchoice)
            {
                $scope.listChoixRep[i].idChoice = choice.chIdchoice;
            }
        })



          $scope.listResponse.push(listReponse.data);
          console.log($scope.listChoixRep);
      })
  });

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
              console.log("Response add to BDD");
           })
      }
  }
}]);


function setlistener() {

    $('.chkBoxGroup').on('change', function() {
      $('.chkBoxGroup').not(this).prop('checked', false);
  });
}
