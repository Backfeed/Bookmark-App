angular.module('qrate.components.landingPage', [
  'qrate.components.landingPage.routes'
])

.controller('LandingPage', LandingPage);

function LandingPage(_DEV) {

  var log = _DEV.log('LANDING PAGE CTRL');

  var ctrl = this;


  angular.extend(ctrl, {
  });

  init();

  function init() {

    log('init');

  }

}