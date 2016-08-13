(function () {
  'use strict';

  angular
    .module('disciplinas')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('disciplinas', {
        abstract: true,
        url: '/disciplinas',
        template: '<ui-view/>'
      })
      .state('disciplinas.list', {
        url: '',
        templateUrl: 'modules/disciplinas/client/views/list-disciplinas.client.view.html',
        controller: 'DisciplinasListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Disciplinas List'
        }
      })
      .state('disciplinas.create', {
        url: '/create',
        templateUrl: 'modules/disciplinas/client/views/form-disciplina.client.view.html',
        controller: 'DisciplinasController',
        controllerAs: 'vm',
        resolve: {
          disciplinaResolve: newDisciplina
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle : 'Disciplinas Create'
        }
      })
      .state('disciplinas.edit', {
        url: '/:disciplinaId/edit',
        templateUrl: 'modules/disciplinas/client/views/form-disciplina.client.view.html',
        controller: 'DisciplinasController',
        controllerAs: 'vm',
        resolve: {
          disciplinaResolve: getDisciplina
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Disciplina {{ disciplinaResolve.name }}'
        }
      })
      .state('disciplinas.view', {
        url: '/:disciplinaId',
        templateUrl: 'modules/disciplinas/client/views/view-disciplina.client.view.html',
        controller: 'DisciplinasController',
        controllerAs: 'vm',
        resolve: {
          disciplinaResolve: getDisciplina
        },
        data:{
          pageTitle: 'Disciplina {{ articleResolve.name }}'
        }
      });
  }

  getDisciplina.$inject = ['$stateParams', 'DisciplinasService'];

  function getDisciplina($stateParams, DisciplinasService) {
    return DisciplinasService.get({
      disciplinaId: $stateParams.disciplinaId
    }).$promise;
  }

  newDisciplina.$inject = ['DisciplinasService'];

  function newDisciplina(DisciplinasService) {
    return new DisciplinasService();
  }
})();
