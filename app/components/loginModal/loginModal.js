angular.module('qrate.components.login', [])
  .controller('LoginModal', LoginModal);

function LoginModal($uibModalInstance, _DEV, Junk) {

  log = _DEV.log('LOGIN MODAL CTRL')

  var ctrl = this;

  angular.extend(ctrl, {
    signin: signin,
    signup: signup,
    closeModal: closeModal,
    email: undefined,
    password: undefined
  });

  function signin() {
    log('signin', 'email', ctrl.email, 'password', ctrl.password);
    Junk.signin(ctrl.email, ctrl.password).then(function(currentUser) {
      log('CB: signin', currentUser);
      closeModal();
    });
  }

  function signup() {
    log('signup', 'email', ctrl.email, 'password', ctrl.password);
    Junk.signup(ctrl.email, ctrl.password).then(function(currentUser) {
      log('CB: signup', currentUser);
      closeModal();
    });
  }

  function closeModal() {
    $uibModalInstance.dismiss('closed by user');
  }

}