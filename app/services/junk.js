angular.module('qrate.services.junk', [])
  .service('Junk', Junk);

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt() {
    return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
}

function Junk($q, $localStorage, _DEV, Helpers, CurrentUser, Resource) {

  var log = _DEV.log('JUNK SERVICE');

  var allLinks = [
    {
      title: "Nostredamus 3.0",
      contributionId: 1,
      url: "augur.net",
      tags: [
        {
          name: "Jack not the reaper",
          endorsmentCount: 9,
          currentUserEndorsment: 1
        },
        {
          name: "Joey not Triviani",
          endorsmentCount: getRandomInt()
        },
        {
          name: "Tony Sakich Sopranos",
          endorsmentCount: getRandomInt()
        },
        {
          name: "Peronet the spagheti",
          endorsmentCount: getRandomInt()
        },
        {
          name: "Ryan automatic judgement",
          endorsmentCount: getRandomInt()
        }
      ]
    },

    {
      title: "Gimmie your margin I'll give u mine",
      contributionId: 3,
      url: "makerdao.com",
      tags: [
        {
          name: "Annonymous dude 1",
          endorsmentCount: 2,
          currentUserEndorsment: 1
        },
        {
          name: "Annonymous dude 2",
          endorsmentCount: 5
        }
      ]
    },

    {
      title: "Crowdsourced Nostredamus",
      contributionId: 3,
      url: "groupgnosis.com",
      tags: [
        {
          name: "foo",
          endorsmentCount: 2,
          currentUserEndorsment: 1
        },
        {
          name: "bar",
          endorsmentCount: 5
        }
      ]
    }

  ];

  var allTags = [
    {
      name: "Cold anarchy!",
      linkCount: 1
    },
    {
      name: "V for vitalik",
      linkCount: 9
    },
    {
      name: "relax nothing is under control",
      linkCount: 5
    },
    {
      name: "Gavin wood do it",
      linkCount: 2
    },
    {
      name: "Vlad the friendly ghost",
      linkCount: 8
    }

  ];

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

    if (query === 'foo') {
      return [];
    }

    return allTags;
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
    return {
      links: allLinks,
      tags: allTags
    }
  }

  function getLinksByTag() {
    var deferred = $q.defer();

    deferred.resolve([
      {
        title: 'Whatever you do, join them',
        url: "colony.io",
        tags: [
          {
            name: 'Captain Jack',
            endorsmentCount: 2,
            contributionId: 1000
          },
          {
            name: 'Proof of Cognition',
            endorsmentCount: 4,
            contributionId: 1001
          }
        ]
      },
      {
        title: 'Who needs keys anywayz?',
        url: "slock.it",
        currentUserEvaluation: 5,
        tags: [
          {
            name: 'Christoph for the win',
            endorsmentCount: 8,
            contributionId: 1003
          },
          {
            name: 'Simon the architect',
            endorsmentCount: 12,
            contributionId: 1004
          },
          {
            name: 'Stephan the thinker',
            endorsmentCount: 6,
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