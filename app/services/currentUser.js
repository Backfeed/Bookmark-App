angular.module('qrate.services.currentUser', [])
  .service('CurrentUser', CurrentUser);

function CurrentUser(_DEV, Resource, $localStorage) {

  var log = _DEV.log('CURRENT USER SERVICE');

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

    Resource.get('api/me').then(function(user) {

      log("init", user);

      set(user);

    });

  }

  function isLogged() {
    return !!localStorage['qrateToken'];
  }

  function get() {
    return $localStorage.qrateCurrentUser || null;
  }

  function set(user) {
    $localStorage.qrateCurrentUser = user;
  }

  function update(params) {
    angular.extend($localStorage.qrateCurrentUser, params);
  }

  function destroy() {
    $localStorage.qrateCurrentUser = null;
  }

}