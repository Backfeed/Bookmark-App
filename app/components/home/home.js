angular.module('qrate.components.home', [
  'qrate.components.home.routes'
])

.controller('Home', Home);

function Home($timeout, $state,  _DEV, Junk) {

  var log = _DEV.log('HOME CTRL');

  var ctrl = this;

  angular.extend(ctrl, {
    search: search,
    rateLink: rateLink,
    endorseTag: endorseTag,
    DEendorseTag: DEendorseTag,
    setTagAsSearchQuery: setTagAsSearchQuery,
    addTagToLink: addTagToLink,
    searchQuery: undefined,
    linksSearchResults: [],
    tagsSearchResults: []
  });

  init();

  function init() {

    log('init');

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
      log("CB: links by tag", links);
      ctrl.linksSearchResults = links;
    });
  }

  function addTagToLink(tagName, linkId) {
    log('add tag', tagName, 'to link with id', linkId);
    Junk.addTagTolink(tagName, linkId).then(function(response) {
      log('CB: add tag to link', response);
    });
  }

  function resetSearchResults() {
    ctrl.linksSearchResults = [];
    ctrl.tagsSearchResults = [];
  }

}