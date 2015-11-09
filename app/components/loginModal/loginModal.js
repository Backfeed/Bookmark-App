angular.module('qrate.components.login', [])
  .controller('LoginModal', LoginModal);

function LoginModal($uibModalInstance, _DEV, Junk) {

  log = _DEV.log('LOGIN MODAL CTRL')

  var ctrl = this;

  angular.extend(ctrl, {
    submit: submit,
    closeModal: closeModal,
    email: undefined,
    password: undefined
  });

  function submit() {
    log('submit', 'email', ctrl.email, 'password', ctrl.password);
    Junk.signup(ctrl.email, ctrl.password).then(function(response){
      log('submit CB', response);
    });
  }

  function closeModal() {
    $uibModalInstance.dismiss('closed by user');
  }

}