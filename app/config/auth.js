angular.module('qrate.config.auth', [])
  .config(auth);

function auth($authProvider) {
  $authProvider.loginRedirect = null
  
  $authProvider.google({
    url: "", // waiting for endpoint 
    clientId: '' // waiting for clientId
  });

}