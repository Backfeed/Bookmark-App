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
      
      if (response && response.currentUser) {
        currentUserResponse = response.currentUser;

        if (currentUserResponse.tokens)
          angular.extend($localStorage.qrateCurrentUser.tokens, currentUserResponse.tokens);

        if (currentUserResponse.reputation)
          angular.extend($localStorage.qrateCurrentUser.reputation, currentUserResponse.reputation);

        currentUserResponse = {};

      }


      return response;

    }

  };
}