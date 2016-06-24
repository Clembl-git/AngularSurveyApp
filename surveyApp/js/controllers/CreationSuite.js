angular.module('controllers')
.controller('CreationSuiteController', ['$rootScope','$scope','$http','$location','SurveyManager','Get',
 function ($rootScope, $scope, $http, $location, SurveyManager, Get) {

  $scope.listControl = [];
  $scope.listControl.push({title:"",text:"Mardi?"});
  nbListItem = 3;

  $scope.addChoice = function() {
    $scope.listControl.push({title:'',text:"Saisissez l'option"+nbListItem});
    nbListItem++;
  };

  $scope.removeChoice = function() {
    $scope.listControl.pop(nbListItem);
    nbListItem--;
  };

  $scope.creationLastStep = function() {

      var jsonObj = {};
      // jquery sucks
      var listChoice = document.getElementsByClassName("itemChoice");

      angular.forEach(listChoice, function(input, key) {
        if(input.value != '')
          choices[i].chTitle = input.value;
      });
      var survey = SurveyManager.getSurvey();
      var user   = SurveyManager.getUser();
      jsonObj = {
        "survey": survey,
        "user"  : user,
        "choiceList" : [
                  {"choice": { "chTitle": "Oui"}},
                  {"choice": { "chTitle": "NON"}}
        ]
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
