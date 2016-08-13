//Disciplinas service used to communicate Disciplinas REST endpoints
(function () {
  'use strict';

  angular
    .module('disciplinas')
    .factory('DisciplinasService', DisciplinasService);

  DisciplinasService.$inject = ['$resource'];

  function DisciplinasService($resource) {
    return $resource('api/disciplinas/:disciplinaId', {
      disciplinaId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
})();
