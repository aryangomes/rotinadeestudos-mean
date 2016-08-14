(function () {
  'use strict';

  angular
    .module('anotacaos')
    .controller('AnotacaosListController', AnotacaosListController);

  AnotacaosListController.$inject = ['AnotacaosService'];

  function AnotacaosListController(AnotacaosService) {
    var vm = this;

    vm.anotacaos = AnotacaosService.query();
  }
})();
