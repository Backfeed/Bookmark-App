angular.module('qrate.components.landingPage.routes', [])
  .config(routes);

function routes($stateProvider) {

  $stateProvider.state('landingPage', {

    url: '/landing',
    templateUrl: 'components/landingPage/landingPage.html',
    controller: 'LandingPage',
    controllerAs: 'ctrl'

  });

}