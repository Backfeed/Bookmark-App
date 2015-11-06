angular.module('qrate.config.auth', [])
  .config(auth);

function auth($authProvider, API_URL) {
  $authProvider.loginRedirect = null
  
  $authProvider.google({
    url: API_URL + "auth/google",
    clientId: 'http://196814886246-j21qupem96rbbighru12kee14ucks16u.apps.googleusercontent.com/' // waiting for clientId
  });

}