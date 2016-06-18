angular.module('factory', [])

.factory('Get', function($http) {
  return {
    globalData: {
    },
    createSurvey: function(email, mdp){
        return httpGetRequest($http, 'survey/createSurvey/'+email+"/"+mdp);
    },


}
});

var baseUrlWS = "http://localhost:8080/Doodle/webresources/";
/* GET sur la requête passé en paramètre */
/* Return une promise HTTP, une réponse asynchrone contenant le retour de la requête  */
function httpGetRequest($http, request) {
  var req = {
    method: 'GET',
    url: baseUrlWS + request,
    headers: {
      'Content-Type':'Accept: application/json, text/plain, * / *'
    }
  };
    return $http(req);
 }

 /* POST sur l'url passé en paramètre
    @param data : le body de la requête */
 /* Return une promise HTTP, une réponse asynchrone contenant le retour de la requête  */
 function httpPostRequest($http, request, data) {
   var req = {
     method: 'POST',
     url: baseUrlWS + request,
     headers: {
        'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
     },
     data: data
   };
     return $http(req);
  }
