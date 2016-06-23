angular.module('controllers')
.controller('CreationController', ['$rootScope','$scope','$http','$location','SurveyManager','Get', 'toastr',
function ($rootScope, $scope, $http, $location, SurveyManager, Get, toastr) {

  console.log("CreationController Called");
  $scope.survey = {};
  var choices = [];
  var postObj = {};
  $scope.choiceList = {};
  $rootScope.typeSurvey = SurveyManager.getType();

/*
{
	"survey": {
		"suTitle": "Je suis un sondage test",
		"suDescription": "Je ne suis qu'un test",
		"suSurveytype": "1",
		"suIsvoteeditable": "1",
		"suEmailonparticipation": "1",
		"suEmailoncomment": "1",
		"suIsresultpublic": "1",
		"suExpirationdate": "28-05-2016",
		"usIduser": "1"
	},
	"user": {
		"usName": "BIpBIP",
		"usEmail": "EMAIL@BIPBiP"
	},
        "choiceList": [
                {"choice": { "chTitle": "Oui"}},
                {"choice": { "chTitle": "NON"}}
        ]
*/
  $scope.creationSuite = function() {
    console.log($scope.inputTypeSurvey);
    if($scope.inputTypeSurvey != undefined) {

      if ($scope.inputTitle != undefined && $scope.inputDescription != undefined
      && $scope.inputDateExpiration != undefined && $scope.userMail != undefined
      && $scope.userName != undefined)
      {
        var dateExp = new Date($scope.inputDateExpiration);
        var month   = dateExp.getMonth() + 1;
        var strDate = dateExp.getDate() + "/" + month + "/" + dateExp.getFullYear();

        console.log($scope.bResultPublic);
        console.log($scope.bVoteEditable);
        console.log($scope.bEmailOnReponse);
        console.log($scope.bEmailOnParticipe);

        SurveyManager.setUser({
          "usName" : $scope.userName,
          "usEmail": $scope.userMail
        });


        $scope.survey = {
        "suTitle"               : $scope.inputTitle,
        "suDescription"         : $scope.inputDescription,
        "suSurveytype"          : $rootScope.typeSurvey.toString(),
        "suExpirationdate"      : strDate,
        "suIsvoteeditable"      : $scope.bVoteEditable != undefined ? $rootScope.typeSurvey.toString() : '0',
        "suEmailoncomment"      : $scope.bEmailOnReponse != undefined ? $rootScope.typeSurvey.toString() : '0',
        "suIsresultpublic"      : $scope.bResultPublic != undefined ? $rootScope.typeSurvey.toString() : '0',
        "suEmailonparticipation": $scope.bEmailOnParticipe != undefined ? $rootScope.typeSurvey.toString() : '0',
        "usIduser"              : "879"
        };

        SurveyManager.setSurvey($scope.survey);

        console.log($scope.survey);
        $scope.typeSurvey =   $scope.survey.suSurveytype;
        $location.path('/creationSuite');
      }
      else {
        toastr.error("Le titre, la description et la date d'expiration sont obligatoire","Erreur");
      }
    }
    else {
      toastr.error("Vous devez obligatoirement choisir un type de choix","Erreur");
    }

  };
}]);
