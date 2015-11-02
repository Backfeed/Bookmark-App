angular.module('qrate.services.dev', [])
  .service('_DEV', _DEV);

function _DEV() {

  var service = {
    log: log
  };

  return service;

  function log(prefix) {

    return function() {
      console.log('***************** ' + prefix + ' *******************');
      _.each(arguments, function(msg) { console.log(msg); });
      console.log('***************** /' + prefix + ' *******************');
      console.log('\n');
    };

  }

}