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
          popularity: 13,
          id: 1
        },
  
        {
          name: 'buzz',
          linksCount: 2,
          popularity: 20,
          id: 2
        },
  
        {
          name: 'pikachu',
          linksCount: 999,
          popularity: 42,
          id: 3
        }
      ]
    );

    return deferred.promise;

  }

  function getTagsByQuery(query) {
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
          popularity: 13,
          id: 1
        },
  
        {
          name: 'buzz',
          linksCount: 2,
          popularity: 20,
          id: 2
        },
  
        {
          name: 'pikachu',
          linksCount: 999,
          popularity: 42,
          id: 3
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

  function sendLink() {
    
  }



}