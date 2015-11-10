angular.module('qrate.config.headersInterceptor', [])
  .factory('httpRequestInterceptor', httpRequestInterceptor)
  .config(headersInterceptor);

function headersInterceptor($httpProvider) {
  $httpProvider.interceptors.push('httpRequestInterceptor');
}

function httpRequestInterceptor($localStorage) {
  return {
    request: function (config) {
      config.headers.appname = 'qrate';
      if ($localStorage.qrateCurrentUser) {
        config.headers['x-access-token'] = $localStorage.qrateCurrentUser['x-access-token'];
      }

      return config;
    }
  };
}