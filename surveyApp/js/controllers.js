angular.module('controllers',['chart.js','ngRoute'])


.controller('AppCtrl', function($scope, $timeout, $q, AuthService, DBCall) {

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
.controller('MenuCtrl', function($scope, AuthService, $http, DBCall) {
  console.log("MenuCTRL Called");
  console.log($location.path());
//   DBCall.getInfosAgence().then(function(response) {
//        for(var i = 0 ; i < response.data.length; i++)
//          $scope.menuItems[i] =  response.data[i];
//      })
})


.controller('CreationController', function ($scope, $http, $filter, $location, SurveyManager) {
  console.log("CreationController Called");
  var survey = {};
  var choices = {};
  var postObj = {};
  $scope.typeSurvey = SurveyManager.getType();
  console.log($scope.typeSurvey);


  $scope.creationSuite = function() {

    var dateExp = new Date($scope.inputDateExpiration);
    var month = dateExp.getMonth() + 1;

    var strDate = dateExp.getDate() + "/" + month + "/" + dateExp.getFullYear();

    survey.suTitle                 = $scope.inputTitle;
    survey.suDescription           = $scope.inputDescription;
    survey.suSurveytype            = $scope.inputTypeSurvey;

    survey.suExpirationdate        = strDate;
    survey.suIsvoteEditable        = $scope.bVoteEditable;
    survey.suEmailoncomment        = $scope.bEmailOnReponse;
    survey.suIsresultpublic        = $scope.bResultPublic;
    survey.suEmailonparticipation  = $scope.bEmailOnParticipe;

    SurveyManager.setType($scope.inputTypeSurvey);

    $scope.typeSurvey =   survey.suSurveytype;
    $location.path('/creationSuite');

  };

  $scope.saveSurveyChoice = function() {
    var nbListItem = 0;





  };
  $scope.listControl = [];

      $scope.listControl.push({title:"",text:"Mardi?"});
      $scope.listControl.push({title:"",text:"Jeudi?"});
      $scope.listControl.push({title:"",text:"Mercredi?"});
          nbListItem = 3;

  $scope.addChoice = function() {
    $scope.listControl.push({title:'',text:"Saisissez l'option"+nbListItem});
    nbListItem++;
  };
  $scope.removeChoice = function() {
    $scope.listControl.pop(nbListItem);
    nbListItem++;
  };

  $scope.creationLastStep = function() {
    for( var i = 0 ; i < $scope.listControl.length ; i++ ) {
      console.log("test");
    }
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
