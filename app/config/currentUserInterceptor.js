angular.module('qrate.config.currentUserInterceptor', [])
  .factory('httpResponseInterceptor', httpResponseInterceptor)
  .config(currentUserInterceptor);

function currentUserInterceptor($httpProvider) {
  $httpProvider.interceptors.push('httpResponseInterceptor');
}

function httpResponseInterceptor($localStorage) {
  var currentUserResponse = {};

  return {

    response: function (response) {
      
      if (response && response.data && response.data.currentUser) {
        currentUserResponse = response.data.currentUser;

        if (currentUserResponse.tokens)
          $localStorage.qrateCurrentUser.tokens = currentUserResponse.tokens;

        if (currentUserResponse.reputation)
          $localStorage.qrateCurrentUser.reputation = currentUserResponse.reputation;

        currentUserResponse = {};

      }


      return response;

    }

  };
}