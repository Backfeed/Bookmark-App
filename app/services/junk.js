angular.module('qrate.services.junk', [])
  .service('Junk', Junk);

function Junk($q, _DEV, Resource) {

  var log = _DEV.log('JUNK SERVICE');

  return {

    getAllTags: getAllTags,
    getTagsByQuery: getTagsByQuery,
    endorseTag: endorseTag,
    getLinksAndTagsByQuery: getLinksAndTagsByQuery,
    getLinksByTag: getLinksByTag,
    addTagsTolink: addTagsTolink,
    evaluateLink: evaluateLink,
    sendLink: sendLink

  };


  function getAllTags() {

    var deferred = $q.defer();


    deferred.resolve( 
      [
        {
          name: 'fizz',
          linksCount: 5,
          popularity: 13
        },
  
        {
          name: 'buzz',
          linksCount: 2,
          popularity: 20
        },
  
        {
          name: 'pikachu',
          linksCount: 999,
          popularity: 42
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
          linksCount: 5,
          popularity: 13
        },
  
        {
          name: 'buzz',
          linksCount: 2,
          popularity: 20
        },
  
        {
          name: 'pikachu',
          linksCount: 999,
          popularity: 42
        }
      ]
    );

    return deferred.promise;
  }

  function endorseTag() {

  }

  function getLinksAndTagsByQuery() {

  }

  function getLinksByTag() {

  }

  function addTagsTolink() {

  }

  function evaluateLink() {

  }

  function sendLink(data) {
    var deferred = $q.defer();

    deferred.resolve(Math.random() > 0.5) // simulate random response if link exists or not

    return deferred.promise;
  }



}