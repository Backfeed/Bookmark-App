angular.module('qrate.services.currentUser', [])
  .service('CurrentUser', CurrentUser);

function CurrentUser($rootScope, _DEV, Resource, $localStorage) {

  var log = _DEV.log('CURRENT USER SERVICE');

  init();

  var service = {

    init: init,
    isLogged: isLogged,
    get: get,
    set: set,
    update: update,
    destroy: destroy

  };

  return service;

  function init() {

    if ( !isLogged() ) {
      log('init guest');
      return;
    }

    Resource.get('api/me').then(
      function(user) {
        log("init", user);
        return set(user);
      },
      function(err) {
        alert('Get current user error check console!');
        log(err);
      }
    );

  }

  function isLogged() {
    return !!$localStorage.qrateCurrentUser;
  }

  function get() {
    return $localStorage.qrateCurrentUser || null;
  }

  function set(currentUser) {
    $rootScope.currentUser = currentUser;
    return $localStorage.qrateCurrentUser = currentUser;
  }

  function update(params) {
    angular.extend($rootScope.currentUser, params);
    return angular.extend($localStorage.qrateCurrentUser, params);
  }

  function destroy() {
    $rootScope.currentUser = null;
    $localStorage.qrateCurrentUser = null;
    log('logout!', '$localStorage.qrateCurrentUser', $localStorage.qrateCurrentUser);
  }

}