(function () {
  'use strict';

  angular
    .module('anotacaos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('anotacaos', {
        abstract: true,
        url: '/anotacaos',
        template: '<ui-view/>'
      })
      .state('anotacaos.list', {
        url: '',
        templateUrl: 'modules/anotacaos/client/views/list-anotacaos.client.view.html',
        controller: 'AnotacaosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Anotacaos List'
        }
      })
      .state('anotacaos.create', {
        url: '/create',
        templateUrl: 'modules/anotacaos/client/views/form-anotacao.client.view.html',
        controller: 'AnotacaosController',
        controllerAs: 'vm',
        resolve: {
          anotacaoResolve: newAnotacao
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Anotacaos Create'
        }
      })
      .state('anotacaos.edit', {
        url: '/:anotacaoId/edit',
        templateUrl: 'modules/anotacaos/client/views/form-anotacao.client.view.html',
        controller: 'AnotacaosController',
        controllerAs: 'vm',
        resolve: {
          anotacaoResolve: getAnotacao
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Anotacao {{ anotacaoResolve.name }}'
        }
      })
      .state('anotacaos.view', {
        url: '/:anotacaoId',
        templateUrl: 'modules/anotacaos/client/views/view-anotacao.client.view.html',
        controller: 'AnotacaosController',
        controllerAs: 'vm',
        resolve: {
          anotacaoResolve: getAnotacao
        },
        data:{
          pageTitle: 'Anotacao {{ articleResolve.name }}'
        }
      });
  }

  getAnotacao.$inject = ['$stateParams', 'AnotacaosService'];

  function getAnotacao($stateParams, AnotacaosService) {
    return AnotacaosService.get({
      anotacaoId: $stateParams.anotacaoId
    }).$promise;
  }

  newAnotacao.$inject = ['AnotacaosService'];

  function newAnotacao(AnotacaosService) {
    return new AnotacaosService();
  }
})();
