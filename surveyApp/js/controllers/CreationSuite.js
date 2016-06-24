angular.module('controllers')
.controller('CreationSuiteController', ['$rootScope','$scope','$http','$location','SurveyManager','Get',
 function ($rootScope, $scope, $http, $location, SurveyManager, Get) {

  console.log($rootScope.typeSurvey);


  $scope.listControl = [];
  $scope.listControl.push({text:"Hey"});
  nbListItem = 0;
   loadDatepicker();



  $scope.addChoice = function() {
    $scope.listControl.push({text:"Saisissez l'option"+nbListItem});
    nbListItem++;
      loadDatepicker();

  };

  $scope.removeChoice = function() {
    $scope.listControl.pop(nbListItem);
    nbListItem--;
  };

  $scope.creationLastStep = function() {

      var jsonObj = {};
      // jquery sucks

      var listChoice = document.getElementsByClassName("itemChoice");

      var survey = SurveyManager.getSurvey();
      var user   = SurveyManager.getUser();
      var mails  = SurveyManager.getListContact();

      var choices = [];
      angular.forEach(listChoice, function(input, key) {
        if(input.value != '')
          choices[key] = {"choice" : {"chTitle": input.value.toString() }};
      });

      jsonObj = {
        "survey": survey,
        "user"  : user,
        "choiceList" : choices,
        "emailGuest" : mails
      };

      // if(choices.length > 0)
      //   survey.choiceList = choices;
      console.log(jsonObj);
      jsonObj = JSON.stringify(jsonObj);
      console.log(jsonObj);
      Get.createSurvey(jsonObj).then(function(resp) {
        console.log(resp);
      })
  }
}]);
