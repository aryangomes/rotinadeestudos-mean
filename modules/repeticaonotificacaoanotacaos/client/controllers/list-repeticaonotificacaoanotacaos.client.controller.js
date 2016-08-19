(function () {
  'use strict';

  angular
    .module('repeticaonotificacaoanotacaos')
    .controller('RepeticaonotificacaoanotacaosListController', RepeticaonotificacaoanotacaosListController);

  RepeticaonotificacaoanotacaosListController.$inject = ['RepeticaonotificacaoanotacaosService'];

  function RepeticaonotificacaoanotacaosListController(RepeticaonotificacaoanotacaosService) {
    var vm = this;

    vm.repeticaonotificacaoanotacaos = RepeticaonotificacaoanotacaosService.query();
  }
})();
