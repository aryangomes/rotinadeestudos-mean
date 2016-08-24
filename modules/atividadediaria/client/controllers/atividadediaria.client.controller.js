(function () {
  'use strict';

  // Atividadediaria controller
  angular
    .module('atividadediaria')
    .controller('AtividadediariaController', AtividadediariaController);

  AtividadediariaController.$inject = ['$scope', '$state', 'Authentication', 'atividadediariumResolve'];

  function AtividadediariaController ($scope, $state, Authentication, atividadediarium) {
    var vm = this;

    vm.authentication = Authentication;
    vm.atividadediarium = atividadediarium;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Atividadediarium
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.atividadediarium.$remove($state.go('atividadediaria.list'));
      }
    }

    // Save Atividadediarium
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.atividadediariumForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.atividadediarium._id) {
        vm.atividadediarium.$update(successCallback, errorCallback);
      } else {
        vm.atividadediarium.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('atividadediaria.view', {
          atividadediariumId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
