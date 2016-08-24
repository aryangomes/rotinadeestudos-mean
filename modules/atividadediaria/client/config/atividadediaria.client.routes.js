(function () {
  'use strict';

  angular
    .module('atividadediaria')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('atividadediaria', {
        abstract: true,
        url: '/atividadediaria',
        template: '<ui-view/>'
      })
      .state('atividadediaria.list', {
        url: '',
        templateUrl: 'modules/atividadediaria/client/views/list-atividadediaria.client.view.html',
        controller: 'AtividadediariaListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Atividadediaria List'
        }
      })
      .state('atividadediaria.create', {
        url: '/create',
        templateUrl: 'modules/atividadediaria/client/views/form-atividadediarium.client.view.html',
        controller: 'AtividadediariaController',
        controllerAs: 'vm',
        resolve: {
          atividadediariumResolve: newAtividadediarium
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Atividadediaria Create'
        }
      })
      .state('atividadediaria.edit', {
        url: '/:atividadediariumId/edit',
        templateUrl: 'modules/atividadediaria/client/views/form-atividadediarium.client.view.html',
        controller: 'AtividadediariaController',
        controllerAs: 'vm',
        resolve: {
          atividadediariumResolve: getAtividadediarium
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Atividadediarium {{ atividadediariumResolve.name }}'
        }
      })
      .state('atividadediaria.view', {
        url: '/:atividadediariumId',
        templateUrl: 'modules/atividadediaria/client/views/view-atividadediarium.client.view.html',
        controller: 'AtividadediariaController',
        controllerAs: 'vm',
        resolve: {
          atividadediariumResolve: getAtividadediarium
        },
        data:{
          pageTitle: 'Atividadediarium {{ articleResolve.name }}'
        }
      });
  }

  getAtividadediarium.$inject = ['$stateParams', 'AtividadediariaService'];

  function getAtividadediarium($stateParams, AtividadediariaService) {
    return AtividadediariaService.get({
      atividadediariumId: $stateParams.atividadediariumId
    }).$promise;
  }

  newAtividadediarium.$inject = ['AtividadediariaService'];

  function newAtividadediarium(AtividadediariaService) {
    return new AtividadediariaService();
  }
})();
