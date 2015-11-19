angular.module('qrate.services.junk', [])
  .service('Junk', Junk);

function Junk($q, $localStorage, _DEV, Helpers, CurrentUser, Resource) {

  var log = _DEV.log('JUNK SERVICE');

  return {

    signup: signup,
    signin: signin,
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
    }).then(function(response) {
      if (response.senderTokenReputationChange && 
          response.senderTokenReputationChange.agentNewReputationBalance) {
        CurrentUser.update({
          tokens: response.senderTokenReputationChange.agentNewReputationBalance
        });
      }

      return response;
    });
  }

  function DEendorseTag(tagId) {
    return Resource.post("evaluations", {
      creator: CurrentUser.get().id,
      contributionId: tagId,
      evaluation: -1
    }).then(function(response) {
      if (response.senderTokenReputationChange && 
          response.senderTokenReputationChange.agentNewReputationBalance) {
        CurrentUser.update({
          tokens: response.senderTokenReputationChange.agentNewReputationBalance
        });
      }

      return response;
    });
  }

  function getLinksAndTagsByQuery(query) {
    return Resource.get('search?query=' + query);
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
    }).then(function(response) {
      if (response.contributorBalance && 
          response.contributorBalance[0] &&
          response.contributorBalance[0].newTokenBalance) {
        CurrentUser.update({
          tokens: response.contributorBalance[0].newTokenBalance
        });
      }

      return response;
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
    }).then(function(response) {
      if (response.contributorBalance && 
          response.contributorBalance[0] &&
          response.contributorBalance[0].newTokenBalance) {
        CurrentUser.update({
          tokens: response.contributorBalance[0].newTokenBalance
        });
      }

      return response;
    });
  }

}