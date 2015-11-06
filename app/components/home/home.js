angular.module('qrate.components.home', [
  'qrate.components.home.routes'
])

.controller('Home', Home);

function Home($scope, $timeout, $state, $uibModal, _DEV, Junk) {

  var log = _DEV.log('HOME CTRL');

  var ctrl = this;

  angular.extend(ctrl, {
    openAddLinkModal: openAddLinkModal,
    search: search,
    rateLink: rateLink,
    endorseTag: endorseTag,
    DEendorseTag: DEendorseTag,
    setTagAsSearchQuery: setTagAsSearchQuery,
    searchQuery: undefined,
    linksSearchResults: [],
    tagsSearchResults: []
  });

  init();

  function init() {

    log('init');

  }

  function openAddLinkModal() {
    var modal = $uibModal.open({
      templateUrl: 'components/addLinkModal/addLinkModal.html',
      controller: 'AddLinkModalCtrl',
      bindToController: true,
      controllerAs: 'ctrl',
      scope: $scope
    });
  }

  function search() {
    resetSearchResults();
    Junk.getLinksAndTagsByQuery(ctrl.searchQuery).then(function(response) {
      log("links and tags by query", ctrl.searchQuery, response);
      ctrl.linksSearchResults = response.links;
      ctrl.tagsSearchResults = response.tags;
    });
  }

  function rateLink(link) {
    $timeout(function() {
      log("after timeout", link);
      Junk.evaluateLink(link.id, link.currentUserEvaluation);
    }, 20);
  }

  function endorseTag(linkId, tagId) {
    log("endorse tag", tagId, "of linkId", linkId)
    Junk.endorseTag(linkId, tagId).then(function(response) {
      log("CB: endorse tag", response);
    });
  }

  function DEendorseTag(linkId, tagId) {
    log("DEendorse tag", tagId, "of linkId", linkId)
    Junk.endorseTag(linkId, tagId).then(function(response) {
      log("CB: DEendorse tag", response);
    });
  }

  function setTagAsSearchQuery(tagName) {
    resetSearchResults();
    ctrl.searchQuery = tagName;
    log("links by tag", tagName);
    Junk.getLinksByTag(tagName).then(function(links) {
      log("Cb: links by tag", links);
      ctrl.linksSearchResults = links;
    });
  }

  function resetSearchResults() {
    ctrl.linksSearchResults = [];
    ctrl.tagsSearchResults = [];
  }

}