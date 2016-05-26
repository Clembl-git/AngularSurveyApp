
function firstToUpperCase( str ) {
    return str.substr(0, 1).toUpperCase() + str.substr(1).toLowerCase();
}

function httpGetRequest($http, request) {
  var req = {
    method: 'GET',
    url:'http://www.localhost:4242/'+request,
    headers: {
      'Content-Type':'Accept: application/json, text/plain, * / *'
    }
  };
    return $http(req);
 }

 function httpPostRequest($http, request, data) {
   var req = {
     method: 'JSONP',
     url:'http://www.localhost:4242/'+request,
     headers: {
       'Content-Type':'Accept: application/json, text/plain, * / *',
       'Access-Control-Allow-Origin': '*'
     },
     data: data
   };
     return $http(req);
  }
