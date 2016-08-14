(function () {
  'use strict';

  angular
    .module('tipoanotacaos')
    .controller('TipoanotacaosListController', TipoanotacaosListController);

  TipoanotacaosListController.$inject = ['TipoanotacaosService'];

  function TipoanotacaosListController(TipoanotacaosService) {
    var vm = this;

    vm.tipoanotacaos = TipoanotacaosService.query();
  }
})();
