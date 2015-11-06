angular.module('qrate', [

  // VENDORS
  'ui.router', 
  'ui.bootstrap.modal',
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
  $mdThemingProvider.theme('default')
      .primaryPalette('orange')
      .accentPalette('pink');

  $mdIconProvider
      .icon('thumbs-up', 'assets/icons/thumbs-up.svg')
      .icon('thumbs-down', 'assets/icons/thumbs-down.svg')
      .icon('magnifying-glass', 'assets/icons/magnifying-glass.svg')
      .icon('star', 'assets/icons/star.svg')
      .icon('star-outlined', 'assets/icons/star-outlined.svg')
      .icon('link', 'assets/icons/link.svg');
});