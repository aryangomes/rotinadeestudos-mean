//Notificacaoanotacaos service used to communicate Notificacaoanotacaos REST endpoints
(function () {
  'use strict';

  angular
    .module('notificacaoanotacaos')
    .factory('NotificacaoanotacaosService', NotificacaoanotacaosService);

  NotificacaoanotacaosService.$inject = ['$resource'];

  function NotificacaoanotacaosService($resource) {
    return $resource('api/notificacaoanotacaos/:notificacaoanotacaoId', {
      notificacaoanotacaoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
