(function () {
  'use strict';

  describe('Repeticaonotificacaoanotacaos Route Tests', function () {
    // Initialize global variables
    var $scope,
      RepeticaonotificacaoanotacaosService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _RepeticaonotificacaoanotacaosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      RepeticaonotificacaoanotacaosService = _RepeticaonotificacaoanotacaosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('repeticaonotificacaoanotacaos');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/repeticaonotificacaoanotacaos');
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
          RepeticaonotificacaoanotacaosController,
          mockRepeticaonotificacaoanotacao;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('repeticaonotificacaoanotacaos.view');
          $templateCache.put('modules/repeticaonotificacaoanotacaos/client/views/view-repeticaonotificacaoanotacao.client.view.html', '');

          // create mock Repeticaonotificacaoanotacao
          mockRepeticaonotificacaoanotacao = new RepeticaonotificacaoanotacaosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Repeticaonotificacaoanotacao Name'
          });

          //Initialize Controller
          RepeticaonotificacaoanotacaosController = $controller('RepeticaonotificacaoanotacaosController as vm', {
            $scope: $scope,
            repeticaonotificacaoanotacaoResolve: mockRepeticaonotificacaoanotacao
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:repeticaonotificacaoanotacaoId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.repeticaonotificacaoanotacaoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            repeticaonotificacaoanotacaoId: 1
          })).toEqual('/repeticaonotificacaoanotacaos/1');
        }));

        it('should attach an Repeticaonotificacaoanotacao to the controller scope', function () {
          expect($scope.vm.repeticaonotificacaoanotacao._id).toBe(mockRepeticaonotificacaoanotacao._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/repeticaonotificacaoanotacaos/client/views/view-repeticaonotificacaoanotacao.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          RepeticaonotificacaoanotacaosController,
          mockRepeticaonotificacaoanotacao;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('repeticaonotificacaoanotacaos.create');
          $templateCache.put('modules/repeticaonotificacaoanotacaos/client/views/form-repeticaonotificacaoanotacao.client.view.html', '');

          // create mock Repeticaonotificacaoanotacao
          mockRepeticaonotificacaoanotacao = new RepeticaonotificacaoanotacaosService();

          //Initialize Controller
          RepeticaonotificacaoanotacaosController = $controller('RepeticaonotificacaoanotacaosController as vm', {
            $scope: $scope,
            repeticaonotificacaoanotacaoResolve: mockRepeticaonotificacaoanotacao
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.repeticaonotificacaoanotacaoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/repeticaonotificacaoanotacaos/create');
        }));

        it('should attach an Repeticaonotificacaoanotacao to the controller scope', function () {
          expect($scope.vm.repeticaonotificacaoanotacao._id).toBe(mockRepeticaonotificacaoanotacao._id);
          expect($scope.vm.repeticaonotificacaoanotacao._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/repeticaonotificacaoanotacaos/client/views/form-repeticaonotificacaoanotacao.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          RepeticaonotificacaoanotacaosController,
          mockRepeticaonotificacaoanotacao;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('repeticaonotificacaoanotacaos.edit');
          $templateCache.put('modules/repeticaonotificacaoanotacaos/client/views/form-repeticaonotificacaoanotacao.client.view.html', '');

          // create mock Repeticaonotificacaoanotacao
          mockRepeticaonotificacaoanotacao = new RepeticaonotificacaoanotacaosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Repeticaonotificacaoanotacao Name'
          });

          //Initialize Controller
          RepeticaonotificacaoanotacaosController = $controller('RepeticaonotificacaoanotacaosController as vm', {
            $scope: $scope,
            repeticaonotificacaoanotacaoResolve: mockRepeticaonotificacaoanotacao
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:repeticaonotificacaoanotacaoId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.repeticaonotificacaoanotacaoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            repeticaonotificacaoanotacaoId: 1
          })).toEqual('/repeticaonotificacaoanotacaos/1/edit');
        }));

        it('should attach an Repeticaonotificacaoanotacao to the controller scope', function () {
          expect($scope.vm.repeticaonotificacaoanotacao._id).toBe(mockRepeticaonotificacaoanotacao._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/repeticaonotificacaoanotacaos/client/views/form-repeticaonotificacaoanotacao.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
