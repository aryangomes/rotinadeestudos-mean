(function () {
  'use strict';

  // Disciplinas controller
  angular
    .module('disciplinas')
    .controller('DisciplinasController', DisciplinasController);

  DisciplinasController.$inject = ['$scope', '$state', 'Authentication', 'disciplinaResolve'];

  function DisciplinasController ($scope, $state, Authentication, disciplina) {
    var vm = this;

    vm.authentication = Authentication;
    vm.disciplina = disciplina;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;

    // Remove existing Disciplina
    function remove() {
      if (confirm('Are you sure you want to delete?')) {
        vm.disciplina.$remove($state.go('disciplinas.list'));
      }
    }

    // Save Disciplina
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.disciplinaForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.disciplina._id) {
        vm.disciplina.$update(successCallback, errorCallback);
      } else {
        vm.disciplina.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('disciplinas.view', {
          disciplinaId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
})();
