angular.module('controllers',['chart.js','ngRoute'])


.controller('AppCtrl', function($scope, $timeout, $q, AuthService, Get) {

    console.log("AppCtrl Called");
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.listControl = new Array();
  $scope.choice = 0;


})

.controller('HomeCtrl', function($scope, $http, $q,$location) {
  console.log("HomeCtrl Called");
      console.log("/HomeCtrl");
  console.log($location.path());
    // Form data for the login modal
    $scope.user  = {};
    $scope.createForm = function() {
       $location.path("/creation");
    };
})
.controller('MenuCtrl', function($scope, AuthService, $http, Get) {
  console.log("MenuCTRL Called");
  console.log($location.path());
//   DBCall.getInfosAgence().then(function(response) {
//        for(var i = 0 ; i < response.data.length; i++)
//          $scope.menuItems[i] =  response.data[i];
//      })
})


.controller('CreationController', function ($scope, $http, $filter, $location, SurveyManager, Get) {
  console.log("CreationController Called");
  $scope.survey = {};
  var choices = [];
  var postObj = {};
  $scope.choiceList = {};
  $scope.typeSurvey = SurveyManager.getType();
  console.log($scope.typeSurvey);
    $scope.listControl = [];
    $scope.listControl.push({title:"",text:"Mardi?"});
    $scope.listControl.push({title:"",text:"Jeudi?"});
    $scope.listControl.push({title:"",text:"Mercredi?"});
    nbListItem = 3;

  $scope.creationSuite = function() {
    var dateExp = new Date($scope.inputDateExpiration);
    var month = dateExp.getMonth() + 1;
    var strDate = dateExp.getDate() + "/" + month + "/" + dateExp.getFullYear();
    $scope.survey.suTitle                 = $scope.inputTitle;
    $scope.survey.suDescription           = $scope.inputDescription;
    $scope.survey.suSurveytype            = "1";

    $scope.survey.suExpirationdate        = strDate;
    $scope.survey.suIsvoteeditable        = "1"; //$scope.bVoteEditable;
    $scope.survey.suEmailoncomment        = "1";// $scope.bEmailOnReponse;
    $scope.survey.suIsresultpublic        = "1";// $scope.bResultPublic;
    $scope.survey.suEmailonparticipation  = "1";// $scope.bEmailOnParticipe;
    $scope.survey.usIduser = '1';
    SurveyManager.setSurvey($scope.survey);

    console.log($scope.survey);
    $scope.typeSurvey =   $scope.survey.suSurveytype;
    $location.path('/creationSuite');

  };


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


      jsonObj.survey = SurveyManager.getSurvey();
      jsonObj.user = {};
      jsonObj.user.usName = "Clément";
      jsonObj.user.usEmail = "clement.mab@gmail.com";
      // if(choices.length > 0)
      //   survey.choiceList = choices;
      console.log(jsonObj);
      jsonObj = JSON.stringify(jsonObj);
      console.log(jsonObj);
      Get.createSurvey(jsonObj).then(function(resp) {
        console.log(resp);
      })
  }
})

.controller('ResultatCtrl', function($scope, $stateParams) {
  console.log("ResultatCtrl Called");
  console.log($location.path());
  $scope.graph = {};
   $scope.graph.data = [
     //Awake
     [16, 15, 20, 12, 16, 12, 8],
     [16, 15, 20, 12, 16, 12, 8],
     [16, 15, 20, 12, 16, 12, 8],
     //Asleep
     [8, 9, 4, 12, 8, 12, 14]
   ];
   $scope.graph.labels = ['Mon', 'Tue', 'Sun'];
   $scope.graph.series = ['Awake', 'Asleep','3','4'];

});
