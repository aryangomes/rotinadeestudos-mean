(function () {
  'use strict';

  describe('Notificacaoanotacaos Route Tests', function () {
    // Initialize global variables
    var $scope,
      NotificacaoanotacaosService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _NotificacaoanotacaosService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      NotificacaoanotacaosService = _NotificacaoanotacaosService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('notificacaoanotacaos');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/notificacaoanotacaos');
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
          NotificacaoanotacaosController,
          mockNotificacaoanotacao;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('notificacaoanotacaos.view');
          $templateCache.put('modules/notificacaoanotacaos/client/views/view-notificacaoanotacao.client.view.html', '');

          // create mock Notificacaoanotacao
          mockNotificacaoanotacao = new NotificacaoanotacaosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Notificacaoanotacao Name'
          });

          //Initialize Controller
          NotificacaoanotacaosController = $controller('NotificacaoanotacaosController as vm', {
            $scope: $scope,
            notificacaoanotacaoResolve: mockNotificacaoanotacao
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:notificacaoanotacaoId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.notificacaoanotacaoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            notificacaoanotacaoId: 1
          })).toEqual('/notificacaoanotacaos/1');
        }));

        it('should attach an Notificacaoanotacao to the controller scope', function () {
          expect($scope.vm.notificacaoanotacao._id).toBe(mockNotificacaoanotacao._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/notificacaoanotacaos/client/views/view-notificacaoanotacao.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          NotificacaoanotacaosController,
          mockNotificacaoanotacao;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('notificacaoanotacaos.create');
          $templateCache.put('modules/notificacaoanotacaos/client/views/form-notificacaoanotacao.client.view.html', '');

          // create mock Notificacaoanotacao
          mockNotificacaoanotacao = new NotificacaoanotacaosService();

          //Initialize Controller
          NotificacaoanotacaosController = $controller('NotificacaoanotacaosController as vm', {
            $scope: $scope,
            notificacaoanotacaoResolve: mockNotificacaoanotacao
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.notificacaoanotacaoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/notificacaoanotacaos/create');
        }));

        it('should attach an Notificacaoanotacao to the controller scope', function () {
          expect($scope.vm.notificacaoanotacao._id).toBe(mockNotificacaoanotacao._id);
          expect($scope.vm.notificacaoanotacao._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/notificacaoanotacaos/client/views/form-notificacaoanotacao.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          NotificacaoanotacaosController,
          mockNotificacaoanotacao;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('notificacaoanotacaos.edit');
          $templateCache.put('modules/notificacaoanotacaos/client/views/form-notificacaoanotacao.client.view.html', '');

          // create mock Notificacaoanotacao
          mockNotificacaoanotacao = new NotificacaoanotacaosService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Notificacaoanotacao Name'
          });

          //Initialize Controller
          NotificacaoanotacaosController = $controller('NotificacaoanotacaosController as vm', {
            $scope: $scope,
            notificacaoanotacaoResolve: mockNotificacaoanotacao
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:notificacaoanotacaoId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.notificacaoanotacaoResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            notificacaoanotacaoId: 1
          })).toEqual('/notificacaoanotacaos/1/edit');
        }));

        it('should attach an Notificacaoanotacao to the controller scope', function () {
          expect($scope.vm.notificacaoanotacao._id).toBe(mockNotificacaoanotacao._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/notificacaoanotacaos/client/views/form-notificacaoanotacao.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
