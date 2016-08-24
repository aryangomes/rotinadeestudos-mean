(function () {
  'use strict';

  // Repeticaonotificacaoanotacaos controller
  angular
    .module('repeticaonotificacaoanotacaos')
    .controller('RepeticaonotificacaoanotacaosController', RepeticaonotificacaoanotacaosController);

  RepeticaonotificacaoanotacaosController.$inject = ['$scope', '$state', 'Authentication', 'repeticaonotificacaoanotacaoResolve'];

  function RepeticaonotificacaoanotacaosController ($scope, $state, Authentication, repeticaonotificacaoanotacao) {
    var vm = this;

    vm.authentication = Authentication;
    vm.repeticaonotificacaoanotacao = repeticaonotificacaoanotacao;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Repeticaonotificacaoanotacao
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.repeticaonotificacaoanotacao.$remove($state.go('repeticaonotificacaoanotacaos.list'));
      }
    }

    // Save Repeticaonotificacaoanotacao
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.repeticaonotificacaoanotacaoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.repeticaonotificacaoanotacao._id) {
        vm.repeticaonotificacaoanotacao.$update(successCallback, errorCallback);
      } else {
        vm.repeticaonotificacaoanotacao.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('repeticaonotificacaoanotacaos.view', {
          repeticaonotificacaoanotacaoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
