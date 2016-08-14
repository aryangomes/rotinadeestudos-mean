(function () {
  'use strict';

  describe('Anotacaos Route Tests', function () {
    // Initialize global variables
    var $scope,
      AnotacaosService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _AnotacaosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      AnotacaosService = _AnotacaosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('anotacaos');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/anotacaos');
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
          AnotacaosController,
          mockAnotacao;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('anotacaos.view');
          $templateCache.put('modules/anotacaos/client/views/view-anotacao.client.view.html', '');

          // create mock Anotacao
          mockAnotacao = new AnotacaosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Anotacao Name'
          });

          //Initialize Controller
          AnotacaosController = $controller('AnotacaosController as vm', {
            $scope: $scope,
            anotacaoResolve: mockAnotacao
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:anotacaoId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.anotacaoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            anotacaoId: 1
          })).toEqual('/anotacaos/1');
        }));

        it('should attach an Anotacao to the controller scope', function () {
          expect($scope.vm.anotacao._id).toBe(mockAnotacao._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/anotacaos/client/views/view-anotacao.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          AnotacaosController,
          mockAnotacao;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('anotacaos.create');
          $templateCache.put('modules/anotacaos/client/views/form-anotacao.client.view.html', '');

          // create mock Anotacao
          mockAnotacao = new AnotacaosService();

          //Initialize Controller
          AnotacaosController = $controller('AnotacaosController as vm', {
            $scope: $scope,
            anotacaoResolve: mockAnotacao
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.anotacaoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/anotacaos/create');
        }));

        it('should attach an Anotacao to the controller scope', function () {
          expect($scope.vm.anotacao._id).toBe(mockAnotacao._id);
          expect($scope.vm.anotacao._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/anotacaos/client/views/form-anotacao.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          AnotacaosController,
          mockAnotacao;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('anotacaos.edit');
          $templateCache.put('modules/anotacaos/client/views/form-anotacao.client.view.html', '');

          // create mock Anotacao
          mockAnotacao = new AnotacaosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Anotacao Name'
          });

          //Initialize Controller
          AnotacaosController = $controller('AnotacaosController as vm', {
            $scope: $scope,
            anotacaoResolve: mockAnotacao
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:anotacaoId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.anotacaoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            anotacaoId: 1
          })).toEqual('/anotacaos/1/edit');
        }));

        it('should attach an Anotacao to the controller scope', function () {
          expect($scope.vm.anotacao._id).toBe(mockAnotacao._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/anotacaos/client/views/form-anotacao.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
