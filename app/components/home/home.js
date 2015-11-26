angular.module('qrate.components.home', [
  'qrate.components.home.routes'
])

.controller('Home', Home);

function Home($q, $scope, $timeout, $state,  _DEV, Helpers, Junk) {

  var log = _DEV.log('HOME CTRL');

  var ctrl = this;


  angular.extend(ctrl, {
    search: search,
    loadMoreLinksSearchResults: loadMoreLinksSearchResults,
    evaluateLink: evaluateLink,
    endorseTag: endorseTag,
    DEendorseTag: DEendorseTag,
    setTagAsSearchQuery: setTagAsSearchQuery,
    refreshTagsToSelectFrom: refreshTagsToSelectFrom,
    addTagToLink: addTagToLink,
    waitingForLinksResults: false,
    searchText: undefined,
    searchHasBeenMade: false, // temp until we move search results to child state
    selectedSearchTag: undefined,
    linksSearchResults: [],
    tagsSearchResults: []
  });

  init();

  function init() {

    log('init');

  }

  function search() {
    resetSearchResults();

    ctrl.waitingForLinksResults = true;

    var searchText = ctrl.searchText || ctrl.selectedSearchTag.name;

    log("links and tags by query", searchText);

    Junk.getLinksAndTagsByQuery(searchText).then(function(response) {
      log("CB links and tags by query", response);
      ctrl.waitingForLinksResults = false;
      ctrl.searchHasBeenMade = true;
      ctrl.linksSearchResults = response.links;
      ctrl.tagsSearchResults = response.tags;
    });
  }

  function loadMoreLinksSearchResults() {
    ctrl.waitingForLinksResults = true;
    log('load more links');
    $q.when(Junk.loadMoreLinksSearchResults()).then(function(response) {
      log('CB: load more links', response);
      
      if (response === 'last page') {
        ctrl.waitingForLinksResults = false;
        return;
      }

      ctrl.linksSearchResults = ctrl.linksSearchResults.concat(response.links);
      ctrl.waitingForLinksResults = false;
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

  function endorseTag(tag) {
    log("endorse tag", tag.contributionId)
    Junk.endorseTag(tag.contributionId).then(function(response) {
      log("CB: endorse tag", response);
      tag.currentUserEvaluation = 0;
      tag.endorsmentCount++;
    });
  }

  function DEendorseTag(tag) {
    log("DEendorse tag", tag.contributionId)
    Junk.DEendorseTag(tag.contributionId).then(function(response) {
      log("CB: DEendorse tag", response);
      tag.currentUserEvaluation = -1;
      tag.endorsmentCount--;
    });
  }

  function setTagAsSearchQuery(tagName) {
    resetSearchResults();
    ctrl.searchText = tagName;
    ctrl.selectedSearchTag = { name: tagName };
  }

  function refreshTagsToSelectFrom(query, tagsToExclude) {
    if (! query)
      return;

    if (tagsToExclude)
      tagsToExclude = Helpers.mapIds(tagsToExclude);

    log("refreshTagsToSelectFrom by query:", query, "excluding tags", tagsToExclude);

    return Junk.getTagsByQuery(query, tagsToExclude);

  }

  function addTagToLink(newTag, link) {
    // Safety check for resetting autocomplete after adding a tag
    if (!newTag || (!newTag.selected && !newTag.searchText) )
      return;

    var tagName = newTag.searchText || !newTag.selected;
    log('add tag', tagName, 'to link with url', link.url);

    Junk.addTagToLink(tagName, link.url).then(function(response) {
      log('CB: add tag to link', response);
      newTag.searchText = "";
      newTag.selected = null;
      link.tags.push(response.tags[0]);
    });
  }

  function resetSearchResults() {
    ctrl.searchHasBeenMade = false;
    ctrl.linksSearchResults = [];
    ctrl.tagsSearchResults = [];
  }

  // Temp until we move search results to child state
  $scope.$on('setTagAsSearchQuery', function(e, tagName) {
    log('set tag', tagName, 'as search query');
    setTagAsSearchQuery(tagName);
  })

}