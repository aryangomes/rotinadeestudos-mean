(function () {
  'use strict';

  angular
    .module('atividadediaria')
    .controller('AtividadediariaListController', AtividadediariaListController);

  AtividadediariaListController.$inject = ['AtividadediariaService'];

  function AtividadediariaListController(AtividadediariaService) {
    var vm = this;

    vm.atividadediaria = AtividadediariaService.query();
  }
})();
