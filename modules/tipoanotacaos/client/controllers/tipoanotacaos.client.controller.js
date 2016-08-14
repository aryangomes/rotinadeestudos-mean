(function () {
  'use strict';

  // Tipoanotacaos controller
  angular
    .module('tipoanotacaos')
    .controller('TipoanotacaosController', TipoanotacaosController);

  TipoanotacaosController.$inject = ['$scope', '$state', 'Authentication', 'tipoanotacaoResolve'];

  function TipoanotacaosController ($scope, $state, Authentication, tipoanotacao) {
    var vm = this;

    vm.authentication = Authentication;
    vm.tipoanotacao = tipoanotacao;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Tipoanotacao
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.tipoanotacao.$remove($state.go('tipoanotacaos.list'));
      }
    }

    // Save Tipoanotacao
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.tipoanotacaoForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.tipoanotacao._id) {
        vm.tipoanotacao.$update(successCallback, errorCallback);
      } else {
        vm.tipoanotacao.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('tipoanotacaos.view', {
          tipoanotacaoId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
