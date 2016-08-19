(function () {
  'use strict';

  angular
    .module('notificacaoanotacaos')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('notificacaoanotacaos', {
        abstract: true,
        url: '/notificacaoanotacaos',
        template: '<ui-view/>'
      })
      .state('notificacaoanotacaos.list', {
        url: '',
        templateUrl: 'modules/notificacaoanotacaos/client/views/list-notificacaoanotacaos.client.view.html',
        controller: 'NotificacaoanotacaosListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Notificacaoanotacaos List'
        }
      })
      .state('notificacaoanotacaos.create', {
        url: '/create',
        templateUrl: 'modules/notificacaoanotacaos/client/views/form-notificacaoanotacao.client.view.html',
        controller: 'NotificacaoanotacaosController',
        controllerAs: 'vm',
        resolve: {
          notificacaoanotacaoResolve: newNotificacaoanotacao
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Notificacaoanotacaos Create'
        }
      })
      .state('notificacaoanotacaos.edit', {
        url: '/:notificacaoanotacaoId/edit',
        templateUrl: 'modules/notificacaoanotacaos/client/views/form-notificacaoanotacao.client.view.html',
        controller: 'NotificacaoanotacaosController',
        controllerAs: 'vm',
        resolve: {
          notificacaoanotacaoResolve: getNotificacaoanotacao
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Notificacaoanotacao {{ notificacaoanotacaoResolve.name }}'
        }
      })
      .state('notificacaoanotacaos.view', {
        url: '/:notificacaoanotacaoId',
        templateUrl: 'modules/notificacaoanotacaos/client/views/view-notificacaoanotacao.client.view.html',
        controller: 'NotificacaoanotacaosController',
        controllerAs: 'vm',
        resolve: {
          notificacaoanotacaoResolve: getNotificacaoanotacao
        },
        data:{
          pageTitle: 'Notificacaoanotacao {{ articleResolve.name }}'
        }
      });
  }

  getNotificacaoanotacao.$inject = ['$stateParams', 'NotificacaoanotacaosService'];

  function getNotificacaoanotacao($stateParams, NotificacaoanotacaosService) {
    return NotificacaoanotacaosService.get({
      notificacaoanotacaoId: $stateParams.notificacaoanotacaoId
    }).$promise;
  }

  newNotificacaoanotacao.$inject = ['NotificacaoanotacaosService'];

  function newNotificacaoanotacao(NotificacaoanotacaosService) {
    return new NotificacaoanotacaosService();
  }
})();
