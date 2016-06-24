angular.module('factory', [])

.factory('Get',  function($http) {
  return {
    createSurvey: function(survey){
        return httpPostRequest($http, 'survey/create', survey);
    },
    getSurveyFromMD5 : function(md5) {
        return httpGetRequest($http, 'survey/getSurvey/' + md5);
    },
    listReponses: function(idChoix) {
      return httpGetRequest($http, 'choice/listReponse/' + idChoix);
    },
    addResponseToSurvey : function(response){
        return httpPostRequest($http, 'survey/addReponseToSurvey/', response);
    },
    editResponse: function(reponse){
      return httpPostRequest($http, 'responses/editReponse', reponse);
    },
    addResponseToSurvey : function(response){
        return httpPostRequest($http, 'survey/addReponseToSurvey/', response);
    }
  }
})

.factory('SurveyManager', function() {
   return {
     data:{
       survey : {},
       user   : {},
       listMail: []
     },
     survey:{
       type: 1
     },
     setType: function(id){
       this.survey.type = id;
     },
     getType: function(){
       return this.survey.type;
     },
     setSurvey: function(survey){
       this.data.survey = survey;
     },
     getSurvey: function(){
       return this.data.survey;
     },
     setUser: function(user){
       this.data.user = user;
     },
     getUser: function(){
       return this.data.user;
     },
     getListContact(){
       return this.data.listMail;
     },
     setListContact(strMails){
       var arrayMails = strMails.split(';');
        for(var i = 0 ; i < arrayMails.length; i++) {
          //A TESTER
            this.data.listMail.push(arrayMails[i]);
        }
     }
   }
 });

 var baseUrlWS = "http://doodle.aschen.ovh:8080/DoodleWebService/webresources/";

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
        'Content-Type':'application/json'
      },
      data: data
    };
      return $http(req);
   }
    function httpPutRequest($http, request, data) {
      var req = {
        method: 'PUT',
        url: baseUrlWS +request,
        headers: {
          'Content-Type':'application/json'
        },
        data: data
      };
        return $http(req);
     }

function loadDatepicker(){
  setTimeout(function () {
    $('.datepicker').datepicker({
      format: 'mm-dd-yyyy'
    });
  }, 1000);
}
