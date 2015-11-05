angular.module('qrate.components.addLinkModal.responseModal', [])
  .controller('AddLinkResponseModalCtrl', AddLinkResponseModalCtrl);

function AddLinkResponseModalCtrl($uibModalInstance, _DEV, isLinkExists) {

  var log = _DEV.log('ADD LINK RESPONSE MODAL CTRL');

  var ctrl = this;

  angular.extend(ctrl, {
    closeModal: closeModal,
    isLinkExists: isLinkExists
  });

  init();

  function init() {
    log("init", "isLinkExists", isLinkExists);
  }

  function closeModal() {
    $uibModalInstance.dismiss("closed by user");
  }

}