//Repeticaonotificacaoanotacaos service used to communicate Repeticaonotificacaoanotacaos REST endpoints
(function () {
  'use strict';

  angular
    .module('repeticaonotificacaoanotacaos')
    .factory('RepeticaonotificacaoanotacaosService', RepeticaonotificacaoanotacaosService);

  RepeticaonotificacaoanotacaosService.$inject = ['$resource'];

  function RepeticaonotificacaoanotacaosService($resource) {
    return $resource('api/repeticaonotificacaoanotacaos/:repeticaonotificacaoanotacaoId', {
      repeticaonotificacaoanotacaoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
