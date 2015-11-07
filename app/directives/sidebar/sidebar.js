angular.module('qrate.directives.sidebar', [])
  .directive('sidebar', sidebar);

function sidebar() {

  return {

    templateUrl: 'directives/sidebar/sidebar.html',
    bindToController: true,
    scope: {},
    controllerAs: 'ctrl',
    controller: sidebarCtrl

  };

}

function sidebarCtrl($rootScope, _DEV, Junk) {

  log = _DEV.log('SIDEBAR DIRECTIVE');

  var ctrl = this;

  angular.extend(ctrl, {

    setTagAsSearchQuery: setTagAsSearchQuery,
    tags: []

  });

  init();

  function init() {

    getTags();

  }

  function setTagAsSearchQuery(tagName) {
    // Temp until we move search result to child state
    $rootScope.$broadcast('setTagAsSearchQuery', tagName);
  }

  function getTags() {
    Junk.getAllTags().then(function(tags){
      ctrl.tags = tags
    });
  }

}