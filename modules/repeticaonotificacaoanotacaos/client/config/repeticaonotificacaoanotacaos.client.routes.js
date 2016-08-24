(function () {
  'use strict';

  angular
    .module('repeticaonotificacaoanotacaos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('repeticaonotificacaoanotacaos', {
        abstract: true,
        url: '/repeticaonotificacaoanotacaos',
        template: '<ui-view/>'
      })
      .state('repeticaonotificacaoanotacaos.list', {
        url: '',
        templateUrl: 'modules/repeticaonotificacaoanotacaos/client/views/list-repeticaonotificacaoanotacaos.client.view.html',
        controller: 'RepeticaonotificacaoanotacaosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Repeticaonotificacaoanotacaos List'
        }
      })
      .state('repeticaonotificacaoanotacaos.create', {
        url: '/create',
        templateUrl: 'modules/repeticaonotificacaoanotacaos/client/views/form-repeticaonotificacaoanotacao.client.view.html',
        controller: 'RepeticaonotificacaoanotacaosController',
        controllerAs: 'vm',
        resolve: {
          repeticaonotificacaoanotacaoResolve: newRepeticaonotificacaoanotacao
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Repeticaonotificacaoanotacaos Create'
        }
      })
      .state('repeticaonotificacaoanotacaos.edit', {
        url: '/:repeticaonotificacaoanotacaoId/edit',
        templateUrl: 'modules/repeticaonotificacaoanotacaos/client/views/form-repeticaonotificacaoanotacao.client.view.html',
        controller: 'RepeticaonotificacaoanotacaosController',
        controllerAs: 'vm',
        resolve: {
          repeticaonotificacaoanotacaoResolve: getRepeticaonotificacaoanotacao
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Repeticaonotificacaoanotacao {{ repeticaonotificacaoanotacaoResolve.name }}'
        }
      })
      .state('repeticaonotificacaoanotacaos.view', {
        url: '/:repeticaonotificacaoanotacaoId',
        templateUrl: 'modules/repeticaonotificacaoanotacaos/client/views/view-repeticaonotificacaoanotacao.client.view.html',
        controller: 'RepeticaonotificacaoanotacaosController',
        controllerAs: 'vm',
        resolve: {
          repeticaonotificacaoanotacaoResolve: getRepeticaonotificacaoanotacao
        },
        data:{
          pageTitle: 'Repeticaonotificacaoanotacao {{ articleResolve.name }}'
        }
      });
  }

  getRepeticaonotificacaoanotacao.$inject = ['$stateParams', 'RepeticaonotificacaoanotacaosService'];

  function getRepeticaonotificacaoanotacao($stateParams, RepeticaonotificacaoanotacaosService) {
    return RepeticaonotificacaoanotacaosService.get({
      repeticaonotificacaoanotacaoId: $stateParams.repeticaonotificacaoanotacaoId
    }).$promise;
  }

  newRepeticaonotificacaoanotacao.$inject = ['RepeticaonotificacaoanotacaosService'];

  function newRepeticaonotificacaoanotacao(RepeticaonotificacaoanotacaosService) {
    return new RepeticaonotificacaoanotacaosService();
  }
})();
