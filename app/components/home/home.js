angular.module('qrate.components.home', [
  'qrate.components.home.routes'
])

.controller('Home', Home);

function Home($scope, $timeout, $state,  _DEV, Helpers, Junk) {

  var log = _DEV.log('HOME CTRL');

  var ctrl = this;

  angular.extend(ctrl, {
    search: search,
    evaluateLink: evaluateLink,
    endorseTag: endorseTag,
    DEendorseTag: DEendorseTag,
    setTagAsSearchQuery: setTagAsSearchQuery,
    refreshTagsToSelectFrom: refreshTagsToSelectFrom,
    addTagToLink: addTagToLink,
    searchQuery: undefined,
    tagsToSelectFrom: [],
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

  function evaluateLink(link) {
    $timeout(function() {
      log("evaluateLink", "linkContributionId", link.contributionId, "evaluation", link.currentUserEvaluation);
      Junk.evaluateLink(link.contributionId, link.currentUserEvaluation).then(function(response) {
        log("CB: evaluateLink", response);
      });
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

  function refreshTagsToSelectFrom(query, tagsToExclude) {
    if (! query)
      return;

    var selectedTagsNamesToExclude = Helpers.mapIds(tagsToExclude);

    log("refreshTagsToSelectFrom by query:", query, "excluding tags", selectedTagsNamesToExclude);

    Junk.getTagsByQuery(query, selectedTagsNamesToExclude).then(function(tags) {
      log("tags for autocomplete", tags);

      if (tags.length) {
        ctrl.tagsToSelectFrom = tags;
      } else {
        ctrl.tagsToSelectFrom = [{ name: query }]; // give user the option to add a tag that haven't been used yet
      }
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

  // Temp until we move search results to child state
  $scope.$on('setTagAsSearchQuery', function(e, tagName) {
    log('set tag', tagName, 'as search query');
    setTagAsSearchQuery(tagName);
  })

}