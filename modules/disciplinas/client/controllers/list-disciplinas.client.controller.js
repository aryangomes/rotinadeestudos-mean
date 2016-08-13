(function () {
  'use strict';

  angular
    .module('disciplinas')
    .controller('DisciplinasListController', DisciplinasListController);

  DisciplinasListController.$inject = ['DisciplinasService'];

  function DisciplinasListController(DisciplinasService) {
    var vm = this;

    vm.disciplinas = DisciplinasService.query();
  }
})();
