angular.module('qrate.config.junk', [])
  .config(junk);

function junk($httpProvider, $locationProvider) {

  $httpProvider.useApplyAsync(true);
  $locationProvider.html5Mode(true).hashPrefix('!');
  
}