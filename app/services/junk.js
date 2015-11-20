angular.module('qrate.services.junk', [])
  .service('Junk', Junk);

function Junk($q, $localStorage, _DEV, Helpers, CurrentUser, Resource) {

  var log = _DEV.log('JUNK SERVICE');

  var linksSearchResultsPage = 1;
  var linksSearchQuery = '';
  var lastLinksSearchResultsPage = false;

  return {

    signup: signup,
    signin: signin,
    loadMoreLinksSearchResults: loadMoreLinksSearchResults,
    getAllTags: getAllTags,
    getTagsByQuery: getTagsByQuery,
    endorseTag: endorseTag,
    DEendorseTag: DEendorseTag,
    getLinksAndTagsByQuery: getLinksAndTagsByQuery,
    getLinksByTag: getLinksByTag, 
    addTagToLink: addTagToLink,
    evaluateLink: evaluateLink,
    sendLink: sendLink

  };

  function signin(email, password) {
    return Resource.get('qrate/agents/login?email=' + email + '&password=' + password)
            .then(function(currentUser) {
              return CurrentUser.set(currentUser);
            });
  }

  function signup(email, password) {
    return Resource.post('qrate/agents/signUp', {
      email: email,
      password: password
    })
    .then(function(currentUser) {
      return CurrentUser.set(currentUser);
    });
  }

  function loadMoreLinksSearchResults() {
    if (lastLinksSearchResultsPage) {
      log('last page so don\'t loadMoreLinksSearchResults by query', linksSearchQuery, 'page number', linksSearchResultsPage);
      return 'last page';
    }

    linksSearchResultsPage++;
    log('loadMoreLinksSearchResults by query', linksSearchQuery, 'page number', linksSearchResultsPage);

    return getLinksAndTagsByQuery(linksSearchQuery, linksSearchResultsPage);
  }

  function getAllTags() {
    return Resource.get('tags');
  }

  function getTagsByQuery(query, tagsNamesToExclude) {
    return Resource.get('tags?query=' + query);
  }

  function endorseTag(tagId) {
    return Resource.post("evaluations", {
      creator: CurrentUser.get().id,
      contributionId: tagId,
      evaluation: 0
    });
  }

  function DEendorseTag(tagId) {
    return Resource.post("evaluations", {
      creator: CurrentUser.get().id,
      contributionId: tagId,
      evaluation: -1
    });
  }

  function getLinksAndTagsByQuery(query, pageNumber) {
    lastLinksSearchResultsPage = false;
    linksSearchQuery = query;
    linksSearchResultsPage = pageNumber || 1;
    return Resource.get('search?query=' + query + '&pageNumber=' + linksSearchResultsPage).then(function(response) {
      if (response.links.length < 10)
        lastLinksSearchResultsPage = true;

      return response;
    });
  }

  function getLinksByTag(tagName) {
    return Resource.get('getLinksByTag?tag=' + tagName);
  }

  function addTagToLink(tagName, linkUrl) {
    return Resource.post('contributions', {
      creator: CurrentUser.get().id,
      type: "Tags",
      network: 1,
      content: { 
        url: linkUrl,
        tags: [tagName]
      }
    });
  }

  function evaluateLink(linkContributionId, linkEvaluation) {
    return Resource.post('evaluations', {
      creator: CurrentUser.get().id,
      contributionId: linkContributionId,
      evaluation: linkEvaluation
    });
  }

  function sendLink(url, evaluation, tags) {
    tagNames = Helpers.mapNames(tags);

    return Resource.post('contributions', {
      creator: CurrentUser.get().id,
      type: "URLAndTags",
      network: 1,
      content: {
        url: url,
        evaluation: evaluation,
        tags: tagNames
      }
    });
  }

}