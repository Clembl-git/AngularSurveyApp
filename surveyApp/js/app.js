'use strict';

var surveyApp = angular.module('surveyApp', [
'controllers',
'factory',
'ngAnimate',
'toastr',
'chart.js',
'ngDialog',
'ngRoute'
]);

angular.module('controllers', []);

surveyApp.config(['$httpProvider', function ($httpProvider) {
  //Reset headers to avoid OPTIONS request (aka preflight)
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // $httpProvider.defaults.headers.common = {};
  // $httpProvider.defaults.headers.post = {};
  // $httpProvider.defaults.headers.put = {};
  // $httpProvider.defaults.headers.patch = {};
}])

.config(['$routeProvider', function($routeProvider, $http, $location) {
  $routeProvider
    .when('/creationSuite', {
        templateUrl: 'templates/creationSuite.html'
      })
    .when('/home', {
        templateUrl: 'templates/home.html'
      })
    .when('/result', {
        templateUrl: 'templates/result.html'
      })
    .when('/creation', {
        templateUrl: 'templates/creation.html'
      })
    .otherwise({ redirectTo: '/home' });
}]);
