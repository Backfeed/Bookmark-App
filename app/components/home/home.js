angular.module('qrate.components.home', [
  'qrate.components.home.routes'
])

.controller('Home', Home);

function Home($scope, $uibModal, _DEV) {

  var log = _DEV.log('HOME CTRL');

  var ctrl = this;

  angular.extend(ctrl, {
    openAddLinkModal: openAddLinkModal
  });

  init();

  function init() {

    log('init');

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

}