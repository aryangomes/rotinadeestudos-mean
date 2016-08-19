(function () {
    'use strict';

    // Anotacaos controller
    angular
            .module('anotacaos')
            .controller('AnotacaosController', AnotacaosController);

    AnotacaosController.$inject = ['$scope', '$state', 'Authentication', 'anotacaoResolve',
        '$http'];

    function AnotacaosController($scope, $state, Authentication, anotacao, $http) {
        var vm = this;
        getDisciplinas($http);
        getTipoAnotacoes($http);
        vm.authentication = Authentication;
        vm.anotacao = anotacao;
        vm.error = null;
        vm.form = {};
        vm.remove = remove;
        vm.save = save;
        $scope.checkOption = function (value, check) {
           
            return(check == value);
        }



        // Remove existing Anotacao
        function remove() {
            if (confirm('Are you sure you want to delete?')) {
                vm.anotacao.$remove($state.go('anotacaos.list'));
            }
        }

        // Save Anotacao
        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.form.anotacaoForm');
                return false;
            }

            // TODO: move create/update logic to service
            if (vm.anotacao._id) {
                vm.anotacao.$update(successCallback, errorCallback);
            } else {
                vm.anotacao.$save(successCallback, errorCallback);
            }

            function successCallback(res) {
                $state.go('anotacaos.view', {
                    anotacaoId: res._id
                });
            }

            function errorCallback(res) {
                vm.error = res.data.message;
            }
        }

        function getDisciplinas($http) {
            $http.get("api/disciplinas").then(function (response) {

                $scope.disciplinas = response.data;

            }, function (response) {

                $scope.disciplinas = response;

            });

        }

        function getTipoAnotacoes($http) {
            $http.get("api/tipoanotacaos").then(function (response) {

                $scope.tipoanotacaos = response.data;

            }, function (response) {

                $scope.tipoanotacaos = response;

            });

        }
    }
})();
