angular.module('qrate.components.home.routes', [])
  .config(routes);

function routes($stateProvider) {

  $stateProvider.state('home', {

    url: '/',
    templateUrl: 'components/home/home.html',
    controller: 'Home',
    controllerAs: 'ctrl'

  });

}