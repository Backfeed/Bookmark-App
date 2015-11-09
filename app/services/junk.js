angular.module('qrate.services.junk', [])
  .service('Junk', Junk);

function Junk($q, $localStorage, _DEV, Helpers, CurrentUser, Resource) {

  var log = _DEV.log('JUNK SERVICE');

  return {

    signup: signup,
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

  function signup(email, password) {
    return Resource.post('qrate/agents', {
      email: email,
      password: password
    }).then(function(response) {
      return $localStorage.qrateCurrentUser = response;
    });
  }


  function getAllTags() {

    var deferred = $q.defer();


    deferred.resolve( 
      [
        {
          name: 'fizz',
          linksCount: 5
        },
  
        {
          name: 'buzz',
          linksCount: 2
        },
  
        {
          name: 'pikachu',
          linksCount: 999
        }
      ]
    );

    return deferred.promise;

  }

  function getTagsByQuery(query, tagsNamesToExclude) {
    var deferred = $q.defer();

    if (query === 'foo') {
      log('getTagsByQuery: foo detected! resolving with empty list')
      deferred.resolve([]) // mock the scenario where no tags match the search query so te use rhas an option to add it
      return deferred.promise;
    }

    deferred.resolve( 
      [
        {
          name: 'fizz',
          linksCount: 5
        },
  
        {
          name: 'buzz',
          linksCount: 2
        },
  
        {
          name: 'pikachu',
          linksCount: 999
        }
      ]
    );

    return deferred.promise;
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
    var deferred = $q.defer();
    
    deferred.resolve({
      links: [
        {
          title: "Link Title 1",
          contributionId: 1,
          url: "http://duckduckgo.com",
          tags: [
            {
              name: 'foo',
              endorsmentCount: 5,
              contributionId: 100
            },
            {
              name: 'bar',
              endorsmentCount: 2,
              contributionId: 101
            },
            {
              name: 'fizz',
              endorsmentCount: 13,
              contributionId: 102
            }
          ]
        },
        {
          title: "Link Title 2",
          contributionId: 2,
          url: "http://fifa.com",
          currentUserEvaluation: 3,
          tags: [
            {
              name: 'sport',
              endorsmentCount: 2,
              contributionId: 103
            },
            {
              name: 'corruption',
              endorsmentCount: 6,
              contributionId: 104
            },
            {
              name: 'waste-of-time',
              endorsmentCount: 99,
              contributionId: 105
            }
          ]
        }
      ],

      tags: [
        {
          name: 'fizz',
          linksCount: 5
        },
  
        {
          name: 'buzz',
          linksCount: 2
        },
  
        {
          name: 'pikachu',
          linksCount: 999
        }
      ]

    });

    return deferred.promise;
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
    });
  }

}