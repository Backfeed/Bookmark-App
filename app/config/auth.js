angular.module('qrate.config.auth', [])
  .config(auth);

function auth($authProvider) {
  $authProvider.loginRedirect = null
  
  $authProvider.google({
    url: "", // waiting for endpoint 
    clientId: 'http://196814886246-j21qupem96rbbighru12kee14ucks16u.apps.googleusercontent.com/' // waiting for clientId
  });

}