angular.module('qrate.services.junk', [])
  .service('Junk', Junk);

function Junk($q, $localStorage, _DEV, Helpers, CurrentUser, Resource) {

  var log = _DEV.log('JUNK SERVICE');

  var allTags = [];

  return {

    signup: signup,
    signin: signin,
    getAllTags: getAllTags,
    getTagsByQuery: getTagsByQuery,
    endorseTag: endorseTag,
    DEendorseTag: DEendorseTag,
    getLinksAndTagsByQuery: getLinksAndTagsByQuery,
    getLinksByTag: getLinksByTag, 
    addTagTolink: addTagTolink,
    evaluateLink: evaluateLink,
    sendLink: sendLink

  };

  function signin(email, password) {
    return Resource.get('qrate/agents/login?email=' + email + '&password=' + password)
    .then(
      function(currentUser) {
        return CurrentUser.set(currentUser);
      },
      function(err) {
        alert("signin error check console!");
        log(err);
      }
    );
  }

  function signup(email, password) {
    return Resource.post('qrate/agents/signUp', {
      email: email,
      password: password
    })
    .then(
      function(currentUser) {
        return CurrentUser.set(currentUser);
      },
      function(err) {
        alert('signup error check console!');
        log(err);
      }
    );
  }

  function getAllTags() {
    return Resource.get('tags').then(function(tags) {
      return allTags = tags;
    });
  }

  function getTagsByQuery(query, tagsNamesToExclude) {
    return Resource.get('tags?query=' + query);
  }

  function endorseTag(linkId, tagId) {
    return Resource.post("evaluations?fields=senderTokenReputationChange,contributionNewValue", {
      creator: CurrentUser.get().id,
      tagId: tagId,
      linkId: linkId,
      evaluation: 0
    });
  }

  function DEendorseTag(linkId, tagId) {
    return Resource.post("evaluations?fields=senderTokenReputationChange,contributionNewValue", {
      creator: CurrentUser.get().id,
      tagId: tagId,
      linkId: linkId,
      evaluation: -1
    });
  }

  function getLinksAndTagsByQuery(query) {
    return Resource.get('search?query=' + query);
  }

  function getLinksByTag() {
    var deferred = $q.defer();

    deferred.resolve([
      {
        title: 'IMFF',
        url: "moo.com",
        tags: [
          {
            name: 'choko',
            endorsmentCount: 2,
            contributionId: 1000
          },
          {
            name: 'barbratheking',
            endorsmentCount: 4,
            contributionId: 1001
          },
          {
            name: 'fizzbuzz',
            endorsmentCount: 13,
            contributionId: 1002
          }
        ]
      },
      {
        title: 'MOOOO',
        url: "imf.com",
        currentUserEvaluation: 1,
        tags: [
          {
            name: 'belongs to the past',
            endorsmentCount: 999,
            contributionId: 1003
          },
          {
            name: 'corruption',
            endorsmentCount: 999,
            contributionId: 1004
          },
          {
            name: 'destroy ASAP',
            endorsmentCount: 9999999,
            contributionId: 1005
          }
        ]
      }
    ]);
    
    return deferred.promise;
  }

  function addTagTolink(tagName, linkId) {
    return Resource.post('contributions', {
      creator: CurrentUser.get().id,
      type: "qrate",
      collaboration: linkId,
      content: { tag: "tagName" }
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
        title: "Awesome title",
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