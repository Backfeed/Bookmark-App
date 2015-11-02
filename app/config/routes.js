angular.module('qrate.config.routes', [])
  .config(routes);

function routes($urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

}