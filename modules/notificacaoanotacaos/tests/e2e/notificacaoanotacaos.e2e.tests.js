'use strict';

describe('Notificacaoanotacaos E2E Tests:', function () {
  describe('Test Notificacaoanotacaos page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/notificacaoanotacaos');
      expect(element.all(by.repeater('notificacaoanotacao in notificacaoanotacaos')).count()).toEqual(0);
    });
  });
});
