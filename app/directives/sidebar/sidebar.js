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

function sidebarCtrl(_DEV, Junk) {

  log = _DEV.log('SIDEBAR DIRECTIVE');

  var ctrl = this;

  angular.extend(ctrl, {

    tags: []

  });

  init();

  function init() {

    getTags();

  }

  function getTags() {
    Junk.getAllTags().then(function(tags){
      ctrl.tags = tags
    });
  }

}