angular.module('qrate.directives.footer', [])
  .directive('footer', footer);

function footer() {

  return {

    templateUrl: 'directives/footer/footer.html',
    bindToController: true,
    scope: {},
    controllerAs: 'ctrl',
    controller: footerCtrl

  };

}

function footerCtrl(_DEV, CurrentUser) {

  log = _DEV.log('FOOTER DIRECTIVE');

  var ctrl = this;

  angular.extend(ctrl, {

  });

  init();

  function init() {

  }

}