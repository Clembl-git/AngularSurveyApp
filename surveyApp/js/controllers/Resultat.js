angular.module('controllers')
.controller('ResultatCtrl', [ '$scope', '$rootScope',  '$location', 'Get',  function($scope,  $rootScope, $location, Get) {

  console.log("ResultatCtrl Called");
  console.log($location.path());



  var survey = $rootScope.actualSurvey.data;
  console.log(survey.choiceList);
  console.log(survey.choiceList.length);



  $scope.graph = {};
  $scope.graph.data = [];
  $scope.graph.data[0] = [];

  $scope.graph.labels = [];
   $scope.graph.series = [];
   console.log(survey.choiceList);
   angular.forEach(survey.choiceList, function(choice, key) {

     $scope.graph.series.push(choice.chTitle)
      $scope.graph.labels.push(choice.chTitle)
      console.log(choice.chIdchoice);
      Get.listReponses(choice.chIdchoice).then(function(listRep)
      {
        console.log("listRep");
        console.log(listRep);
        console.log($scope.graph.data);
        $scope.graph.data[0].push(listRep.data.length);
      });
    console.log($scope.graph);
   })

}]);
