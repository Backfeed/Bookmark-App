angular.module('qrate.components.login', [])
  .controller('LoginModal', LoginModal);

function LoginModal($uibModalInstance, _DEV, Junk) {

  log = _DEV.log('LOGIN MODAL CTRL')

  var ctrl = this;

  angular.extend(ctrl, {
    signin: signin,
    signup: signup,
    closeModal: closeModal,
    isProcessing: false,
    email: undefined,
    password: undefined
  });

  function signin() {
    ctrl.isProcessing = true;
    log('signin', 'email', ctrl.email, 'password', ctrl.password);
    Junk.signin(ctrl.email, ctrl.password).then(
      function(currentUser) {
        log('CB: signin', currentUser);
        closeModal();
      },
      function(err) {
        ctrl.isProcessing = false;
        log(err);
        if (err.data && err.data.message) {
          alert(err.data.message);
        } else {
          alert('we are sorry, there was an error signing in, please try again');
        }
      }
    );
  }

  function signup() {
    log('signup', 'email', ctrl.email, 'password', ctrl.password);
    Junk.signup(ctrl.email, ctrl.password).then(
      function(currentUser) {
        log('CB: signup', currentUser);
        closeModal();
      },
      function(err) {
        log(err);
        ctrl.isProcessing = false;
        if (err.data && err.data.message) {
          alert(err.data.message);
        } else {
          alert('we are sorry, there was an error signing up, please try again');
        }
      }
    );
  }

  function closeModal() {
    $uibModalInstance.dismiss('closed by user');
  }

}