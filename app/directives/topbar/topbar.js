angular.module('qrate.directives.topbar', [])
  .directive('topbar', topbar);

function topbar() {

  return {

    templateUrl: 'directives/topbar/topbar.html',
    bindToController: true,
    scope: {},
    controllerAs: 'ctrl',
    controller: topbarCtrl

  };

}

function topbarCtrl(_DEV, CurrentUser) {

  log = _DEV.log('TOPBAR DIRECTIVE');

  var ctrl = this;

  angular.extend(ctrl, {

    login: login,
    logout: logout,
    currentUser: CurrentUser.get()

  });

  init();

  function init() {

  }

  function login() {

    log('this should log me in!');

  }

  function logout() {

    log('this should log me out!');

  }



}