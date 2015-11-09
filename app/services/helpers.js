angular.module('qrate.services.helpers', [])
  .service('Helpers', Helpers);

function Helpers() {

  var service = {
    toId: toId,
    toName: toName,
    mapIds: mapIds,
    mapNames: mapNames
  };

  return service;

  function toId(x) {
    return x.id;
  }

  function toName(x) {
    return x.name;
  }

  function mapIds(xs) {
    return _.map(xs, toId);
  }

  function mapNames(xs) {
    return _.map(xs, toName);
  }

}