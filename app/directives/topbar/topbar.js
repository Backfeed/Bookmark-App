angular.module('qrate.directives.topbar', ['ui.gravatar'])
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

function topbarCtrl($auth, _DEV, $uibModal, CurrentUser, $scope) {

  log = _DEV.log('TOPBAR DIRECTIVE');

  var ctrl = this;

  angular.extend(ctrl, {
    openAddLinkModal: openAddLinkModal,
    login: login,
    logout: logout,
    currentUser: CurrentUser.get()

  });

  init();

  function init() {

  }

  function openAddLinkModal() {
    var modal = $uibModal.open({
      templateUrl: 'components/addLinkModal/addLinkModal.html',
      controller: 'AddLinkModalCtrl',
      bindToController: true,
      controllerAs: 'ctrl',
      scope: $scope
    });
  }

  function login() {

    var modal = $uibModal.open({
      templateUrl: 'components/loginModal/loginModal.html',
      controller: 'LoginModal',
      bindToController: true,
      controllerAs: 'ctrl',
      scope: $scope
    });

  }

  function logout() {
    CurrentUser.destroy();
  }

}