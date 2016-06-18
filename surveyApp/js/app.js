'use strict';
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var SSurvey = angular.module('SSurvey', [
'controllers',
'ngRoute'
]);


SSurvey.config(['$routeProvider', function($routeProvider, $http, $location) {
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


SSurvey.factory('SurveyManager', function() {
   return {
     survey:{
       type: 1,
       titre: "",
       description:"",
       userName: "",
       userEmail: "",
       emailOnAnswer: false,
       restrictedViewAccess: false,
       restrictedVoteAccess: false
     },
     setType: function(id){
       this.survey.type = id;
     },
     getType: function(){
       return this.survey.type;
     }
   }
 });
SSurvey.factory('AuthService', function() {
   return {
     userInfo:{
       nom: "",
       prenom: "",
       idAgence: "",
       logged: false
     },
     setLoggedUser: function(nom, prenom, idAgence) {
      console.log(nom, prenom, idAgence);
       this.userInfo.nom = firstToUpperCase(nom);
       this.userInfo.prenom = firstToUpperCase(prenom);
       this.userInfo.idAgence = idAgence;
       this.userInfo.logged = true;
     }
   };
 });

SSurvey.factory('DBCall', function($http) {
   return {
     data: {
       list: {},
     },
     getUserFromLogin: function(userlogin) {
       return httpGetRequest($http, "getUserFromLogin/"+userlogin)
     },
     getInfosAgence: function() {
       return httpGetRequest($http, "getInfosAgence");
     },
     getAllCollaborateur: function() {
      // return httpGetRequest($http, "getAllCollaborateur");
      return getAllCollaborateur2();
     },
     getPrevisionsByAgence: function(agenceId, dateD, dateF) {
       return httpGetRequest($http, "getPrevisionsByAgence/"+agenceId);

     }
   }
 });


SSurvey.filter('capitalize', function() {
     return function(input) {
       return (!!input) ? firstToUpperCase(input) : '';
     }
 })
SSurvey.filter('firstLetterOnly', function() {
     return function(input) {
       return (!!input) ? input.charAt(0)+"." : '';
     }
 })
SSurvey.filter('libelleDay', function() {
     return function(input) {
       return (!!input) ? moment(input).format('dddd') : '';
     }
 })
SSurvey.filter('dayAndMonth', function() {
     return function(input) {
       return (!!input) ? moment(input).format('D, MMM') : '';
     }
 })
SSurvey.filter('dateOnly', function() {
     return function(input) {
       return (!!input) ? moment(input).format('DD/MM/YYYY') : '';
     }
 });
