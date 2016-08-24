(function () {
  'use strict';

  // Notificacaoanotacaos controller
  angular
    .module('notificacaoanotacaos')
    .controller('NotificacaoanotacaosController', NotificacaoanotacaosController);

  NotificacaoanotacaosController.$inject = ['$scope', '$state', 'Authentication', 'notificacaoanotacaoResolve'];

  function NotificacaoanotacaosController ($scope, $state, Authentication, notificacaoanotacao) {
    var vm = this;

    vm.authentication = Authentication;
    vm.notificacaoanotacao = notificacaoanotacao;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Notificacaoanotacao
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.notificacaoanotacao.$remove($state.go('notificacaoanotacaos.list'));
      }
    }

    // Save Notificacaoanotacao
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.notificacaoanotacaoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.notificacaoanotacao._id) {
        vm.notificacaoanotacao.$update(successCallback, errorCallback);
      } else {
        vm.notificacaoanotacao.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('notificacaoanotacaos.view', {
          notificacaoanotacaoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
