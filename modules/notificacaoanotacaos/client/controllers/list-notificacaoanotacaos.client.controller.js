(function () {
  'use strict';

  angular
    .module('notificacaoanotacaos')
    .controller('NotificacaoanotacaosListController', NotificacaoanotacaosListController);

  NotificacaoanotacaosListController.$inject = ['NotificacaoanotacaosService'];

  function NotificacaoanotacaosListController(NotificacaoanotacaosService) {
    var vm = this;

    vm.notificacaoanotacaos = NotificacaoanotacaosService.query();
  }
})();
