angular.module('qrate.config.auth', [])
  .config(auth);

function auth($authProvider, API_URL) {
  $authProvider.loginRedirect = null
  
  $authProvider.google({
    url: API_URL + "auth/google",
    clientId: '510864204375-t007r3cb1e9tvnoa759q69p73qmjod7i.apps.googleusercontent.com'
  });

}