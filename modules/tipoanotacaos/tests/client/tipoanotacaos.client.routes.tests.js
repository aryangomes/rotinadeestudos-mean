(function () {
  'use strict';

  describe('Tipoanotacaos Route Tests', function () {
    // Initialize global variables
    var $scope,
      TipoanotacaosService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TipoanotacaosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TipoanotacaosService = _TipoanotacaosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('tipoanotacaos');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/tipoanotacaos');
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
          TipoanotacaosController,
          mockTipoanotacao;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('tipoanotacaos.view');
          $templateCache.put('modules/tipoanotacaos/client/views/view-tipoanotacao.client.view.html', '');

          // create mock Tipoanotacao
          mockTipoanotacao = new TipoanotacaosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Tipoanotacao Name'
          });

          //Initialize Controller
          TipoanotacaosController = $controller('TipoanotacaosController as vm', {
            $scope: $scope,
            tipoanotacaoResolve: mockTipoanotacao
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:tipoanotacaoId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.tipoanotacaoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            tipoanotacaoId: 1
          })).toEqual('/tipoanotacaos/1');
        }));

        it('should attach an Tipoanotacao to the controller scope', function () {
          expect($scope.vm.tipoanotacao._id).toBe(mockTipoanotacao._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/tipoanotacaos/client/views/view-tipoanotacao.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TipoanotacaosController,
          mockTipoanotacao;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('tipoanotacaos.create');
          $templateCache.put('modules/tipoanotacaos/client/views/form-tipoanotacao.client.view.html', '');

          // create mock Tipoanotacao
          mockTipoanotacao = new TipoanotacaosService();

          //Initialize Controller
          TipoanotacaosController = $controller('TipoanotacaosController as vm', {
            $scope: $scope,
            tipoanotacaoResolve: mockTipoanotacao
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.tipoanotacaoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/tipoanotacaos/create');
        }));

        it('should attach an Tipoanotacao to the controller scope', function () {
          expect($scope.vm.tipoanotacao._id).toBe(mockTipoanotacao._id);
          expect($scope.vm.tipoanotacao._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/tipoanotacaos/client/views/form-tipoanotacao.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TipoanotacaosController,
          mockTipoanotacao;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('tipoanotacaos.edit');
          $templateCache.put('modules/tipoanotacaos/client/views/form-tipoanotacao.client.view.html', '');

          // create mock Tipoanotacao
          mockTipoanotacao = new TipoanotacaosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Tipoanotacao Name'
          });

          //Initialize Controller
          TipoanotacaosController = $controller('TipoanotacaosController as vm', {
            $scope: $scope,
            tipoanotacaoResolve: mockTipoanotacao
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:tipoanotacaoId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.tipoanotacaoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            tipoanotacaoId: 1
          })).toEqual('/tipoanotacaos/1/edit');
        }));

        it('should attach an Tipoanotacao to the controller scope', function () {
          expect($scope.vm.tipoanotacao._id).toBe(mockTipoanotacao._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/tipoanotacaos/client/views/form-tipoanotacao.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
