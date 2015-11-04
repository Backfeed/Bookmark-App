angular.module('qrate.services.resource', [])
  .service('Resource', Resource);

function Resource($http, $localStorage, API_URL, _DEV) {

  var log = _DEV.log("RESOURCE");

  var service = {

    get: get,
    post: post,
    put: put,
    destroy: destroy

  };

  return service;

  function get(url, params) {
    return $http.get(API_URL + url, mergeParams(params))
            .then(function(response) {
              return response.data;
            });
  }

  function post(url, params) {
    return $http.post(API_URL + url, mergeParams(params))
            .then(function(response) {
              return response.data;
            });
  }

  function put(url, params) {
    return $http.put(API_URL + url, mergeParams(params))
            .then(function(response) {
              return response.data;
            });
  }

  function destroy(url, params) {
    return $http.delete(API_URL + url, mergeParams(params))
            .then(function(response) {
              return response.data;
            });
  }

  function getBaseParams() {

    return { 

    };

  }
  
  function mergeParams(params) {
    return params ? angular.extend(getBaseParams(), params) : getBaseParams();
  }

}