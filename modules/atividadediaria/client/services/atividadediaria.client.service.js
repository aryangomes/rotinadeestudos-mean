//Atividadediaria service used to communicate Atividadediaria REST endpoints
(function () {
  'use strict';

  angular
    .module('atividadediaria')
    .factory('AtividadediariaService', AtividadediariaService);

  AtividadediariaService.$inject = ['$resource'];

  function AtividadediariaService($resource) {
    return $resource('api/atividadediaria/:atividadediariumId', {
      atividadediariumId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
