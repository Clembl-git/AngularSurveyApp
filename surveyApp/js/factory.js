angular.module('factory', [])

.factory('Get', function($http) {
  return {
    globalData: {
    },
    createSurvey: function(survey){
        return httpPostRequest($http, 'survey/create', survey);
    }
}
});

var baseUrlWS = "http://localhost:8080/Doodle/webresources/";
/* GET sur la requête passé en paramètre */
/* Return une promise HTTP, une réponse asynchrone contenant le retour de la requête  */

function httpGetRequest($http, request) {
  var req = {
    method: 'GET',
    url: baseUrlWS +request,
    headers: {
      'Content-Type':'Accept: application/json, text/plain, * / *'
    }
  };
    return $http(req);
 }

 function httpPostRequest($http, request, data) {
   var req = {
     method: 'POST',
     url: baseUrlWS +request,
     headers: {
       'Accept':'/*',
       'Accept-Language':'fr-FR,fr;q=0.8,en-US;q=0.6,en;q=0.4',
       'Content-Type':'application/json'
     },
     data: data
   };
     return $http(req);
  }
