(function () {
  'use strict';

  angular
    .module('tipoanotacaos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('tipoanotacaos', {
        abstract: true,
        url: '/tipoanotacaos',
        template: '<ui-view/>'
      })
      .state('tipoanotacaos.list', {
        url: '',
        templateUrl: 'modules/tipoanotacaos/client/views/list-tipoanotacaos.client.view.html',
        controller: 'TipoanotacaosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Tipoanotacaos List'
        }
      })
      .state('tipoanotacaos.create', {
        url: '/create',
        templateUrl: 'modules/tipoanotacaos/client/views/form-tipoanotacao.client.view.html',
        controller: 'TipoanotacaosController',
        controllerAs: 'vm',
        resolve: {
          tipoanotacaoResolve: newTipoanotacao
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Tipoanotacaos Create'
        }
      })
      .state('tipoanotacaos.edit', {
        url: '/:tipoanotacaoId/edit',
        templateUrl: 'modules/tipoanotacaos/client/views/form-tipoanotacao.client.view.html',
        controller: 'TipoanotacaosController',
        controllerAs: 'vm',
        resolve: {
          tipoanotacaoResolve: getTipoanotacao
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Tipoanotacao {{ tipoanotacaoResolve.name }}'
        }
      })
      .state('tipoanotacaos.view', {
        url: '/:tipoanotacaoId',
        templateUrl: 'modules/tipoanotacaos/client/views/view-tipoanotacao.client.view.html',
        controller: 'TipoanotacaosController',
        controllerAs: 'vm',
        resolve: {
          tipoanotacaoResolve: getTipoanotacao
        },
        data:{
          pageTitle: 'Tipoanotacao {{ articleResolve.name }}'
        }
      });
  }

  getTipoanotacao.$inject = ['$stateParams', 'TipoanotacaosService'];

  function getTipoanotacao($stateParams, TipoanotacaosService) {
    return TipoanotacaosService.get({
      tipoanotacaoId: $stateParams.tipoanotacaoId
    }).$promise;
  }

  newTipoanotacao.$inject = ['TipoanotacaosService'];

  function newTipoanotacao(TipoanotacaosService) {
    return new TipoanotacaosService();
  }
})();
