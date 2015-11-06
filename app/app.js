angular.module('qrate', [

  // VENDORS
  'ui.router', 
  'ui.bootstrap.modal',
  'ui.bootstrap.rating',
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

]).config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
      .primaryPalette('orange')
      .accentPalette('pink');
});