angular.module('qrate.services.helpers', [])
  .service('Helpers', Helpers);

function Helpers() {

  var service = {
    toId: toId,
    mapIds: mapIds
  };

  return service;

  function toId(x) {
    return x.id;
  }

  function mapIds(xs) {
    return _.map(xs, toId);
  }

}