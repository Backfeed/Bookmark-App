angular.module('qrate', [

  // VENDORS
  'ui.router', 
  'infinite-scroll',
  'ui.bootstrap.modal',
  'ui.bootstrap.tooltip',
  'ui.bootstrap.popover',
  'ui.bootstrap.tpls',
  'ngMaterial',
  'ngStorage',
  'ui.select',
  'satellizer',

  // APP
  'qrate.config',
  'qrate.directives',
  'qrate.services',
  'qrate.components'

]).config(function($mdThemingProvider, $mdIconProvider) {
  $mdThemingProvider.definePalette('qratePrimary', $mdThemingProvider.extendPalette('light-blue', {
    '400': '4285f4'
  }));

  $mdThemingProvider.definePalette('qrateAccent', $mdThemingProvider.extendPalette('amber', {
    '200': 'fbbc05'
  }));

  $mdThemingProvider.theme('default')
      .primaryPalette('qratePrimary', {
        'default': '400'
      })
      .accentPalette('qrateAccent', {
        'default': '200'
      });

  $mdIconProvider
      .icon('thumbs-up', 'assets/icons/thumbs-up.svg')
      .icon('thumbs-down', 'assets/icons/thumbs-down.svg')
      .icon('magnifying-glass', 'assets/icons/magnifying-glass.svg')
      .icon('star-outlined', 'assets/icons/star-outlined.svg')
      .icon('star', 'assets/icons/star.svg')
      .icon('link', 'assets/icons/link.svg')
      .icon('minus', 'assets/icons/minus.svg')
      .icon('plus', 'assets/icons/plus.svg');
});