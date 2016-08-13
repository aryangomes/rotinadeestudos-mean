(function () {
  'use strict';

  describe('Disciplinas Route Tests', function () {
    // Initialize global variables
    var $scope,
      DisciplinasService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _DisciplinasService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      DisciplinasService = _DisciplinasService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('disciplinas');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/disciplinas');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          DisciplinasController,
          mockDisciplina;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('disciplinas.view');
          $templateCache.put('modules/disciplinas/client/views/view-disciplina.client.view.html', '');

          // create mock Disciplina
          mockDisciplina = new DisciplinasService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Disciplina Name'
          });

          //Initialize Controller
          DisciplinasController = $controller('DisciplinasController as vm', {
            $scope: $scope,
            disciplinaResolve: mockDisciplina
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:disciplinaId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.disciplinaResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            disciplinaId: 1
          })).toEqual('/disciplinas/1');
        }));

        it('should attach an Disciplina to the controller scope', function () {
          expect($scope.vm.disciplina._id).toBe(mockDisciplina._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/disciplinas/client/views/view-disciplina.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          DisciplinasController,
          mockDisciplina;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('disciplinas.create');
          $templateCache.put('modules/disciplinas/client/views/form-disciplina.client.view.html', '');

          // create mock Disciplina
          mockDisciplina = new DisciplinasService();

          //Initialize Controller
          DisciplinasController = $controller('DisciplinasController as vm', {
            $scope: $scope,
            disciplinaResolve: mockDisciplina
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.disciplinaResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/disciplinas/create');
        }));

        it('should attach an Disciplina to the controller scope', function () {
          expect($scope.vm.disciplina._id).toBe(mockDisciplina._id);
          expect($scope.vm.disciplina._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/disciplinas/client/views/form-disciplina.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          DisciplinasController,
          mockDisciplina;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('disciplinas.edit');
          $templateCache.put('modules/disciplinas/client/views/form-disciplina.client.view.html', '');

          // create mock Disciplina
          mockDisciplina = new DisciplinasService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Disciplina Name'
          });

          //Initialize Controller
          DisciplinasController = $controller('DisciplinasController as vm', {
            $scope: $scope,
            disciplinaResolve: mockDisciplina
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:disciplinaId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.disciplinaResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            disciplinaId: 1
          })).toEqual('/disciplinas/1/edit');
        }));

        it('should attach an Disciplina to the controller scope', function () {
          expect($scope.vm.disciplina._id).toBe(mockDisciplina._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/disciplinas/client/views/form-disciplina.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
