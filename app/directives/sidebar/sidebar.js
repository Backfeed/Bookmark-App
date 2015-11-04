angular.module('qrate.directives.sidebar', [])
  .directive('sidebar', sidebar);

function sidebar() {

  return {

    templateUrl: 'directives/sidebar/sidebar.html',
    controllerAs: 'ctrl',
    controller: sidebarCtrl

  };

}

function sidebarCtrl(_DEV) {

  log = _DEV.log('SIDEBAR DIRECTIVE');

  var ctrl = this;

  angular.extend(ctrl, {

    tags: [],
    foo: 'bar'

  });

  init();

  function init() {

    getTags();

    ctrl.bla = 2;

  }

  function getTags() {

    // TODO :: replace this with api call
    ctrl.tags = [

      {
        name: 'fizz',
        linksCount: 5,
        popularity: 13,
        id: 1
      },

      {
        name: 'buzz',
        linksCount: 2,
        popularity: 20,
        id: 2
      },

      {
        name: 'pikachu',
        linksCount: 999,
        popularity: 42,
        id: 3
      }
      
    ];

  }

}