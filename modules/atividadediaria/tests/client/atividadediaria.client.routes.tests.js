(function () {
  'use strict';

  describe('Atividadediaria Route Tests', function () {
    // Initialize global variables
    var $scope,
      AtividadediariaService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AtividadediariaService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AtividadediariaService = _AtividadediariaService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('atividadediaria');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/atividadediaria');
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
          AtividadediariaController,
          mockAtividadediarium;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('atividadediaria.view');
          $templateCache.put('modules/atividadediaria/client/views/view-atividadediarium.client.view.html', '');

          // create mock Atividadediarium
          mockAtividadediarium = new AtividadediariaService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Atividadediarium Name'
          });

          //Initialize Controller
          AtividadediariaController = $controller('AtividadediariaController as vm', {
            $scope: $scope,
            atividadediariumResolve: mockAtividadediarium
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:atividadediariumId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.atividadediariumResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            atividadediariumId: 1
          })).toEqual('/atividadediaria/1');
        }));

        it('should attach an Atividadediarium to the controller scope', function () {
          expect($scope.vm.atividadediarium._id).toBe(mockAtividadediarium._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/atividadediaria/client/views/view-atividadediarium.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AtividadediariaController,
          mockAtividadediarium;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('atividadediaria.create');
          $templateCache.put('modules/atividadediaria/client/views/form-atividadediarium.client.view.html', '');

          // create mock Atividadediarium
          mockAtividadediarium = new AtividadediariaService();

          //Initialize Controller
          AtividadediariaController = $controller('AtividadediariaController as vm', {
            $scope: $scope,
            atividadediariumResolve: mockAtividadediarium
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.atividadediariumResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/atividadediaria/create');
        }));

        it('should attach an Atividadediarium to the controller scope', function () {
          expect($scope.vm.atividadediarium._id).toBe(mockAtividadediarium._id);
          expect($scope.vm.atividadediarium._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/atividadediaria/client/views/form-atividadediarium.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AtividadediariaController,
          mockAtividadediarium;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('atividadediaria.edit');
          $templateCache.put('modules/atividadediaria/client/views/form-atividadediarium.client.view.html', '');

          // create mock Atividadediarium
          mockAtividadediarium = new AtividadediariaService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Atividadediarium Name'
          });

          //Initialize Controller
          AtividadediariaController = $controller('AtividadediariaController as vm', {
            $scope: $scope,
            atividadediariumResolve: mockAtividadediarium
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:atividadediariumId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.atividadediariumResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            atividadediariumId: 1
          })).toEqual('/atividadediaria/1/edit');
        }));

        it('should attach an Atividadediarium to the controller scope', function () {
          expect($scope.vm.atividadediarium._id).toBe(mockAtividadediarium._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/atividadediaria/client/views/form-atividadediarium.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
