//Anotacaos service used to communicate Anotacaos REST endpoints
(function () {
  'use strict';

  angular
    .module('anotacaos')
    .factory('AnotacaosService', AnotacaosService);

  AnotacaosService.$inject = ['$resource'];
 
  function AnotacaosService($resource) {
    return $resource('api/anotacaos/:anotacaoId', {
      anotacaoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
  

})();
