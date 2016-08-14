//Tipoanotacaos service used to communicate Tipoanotacaos REST endpoints
(function () {
  'use strict';

  angular
    .module('tipoanotacaos')
    .factory('TipoanotacaosService', TipoanotacaosService);

  TipoanotacaosService.$inject = ['$resource'];

  function TipoanotacaosService($resource) {
    return $resource('api/tipoanotacaos/:tipoanotacaoId', {
      tipoanotacaoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
