'use strict';

describe('Repeticaonotificacaoanotacaos E2E Tests:', function () {
  describe('Test Repeticaonotificacaoanotacaos page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/repeticaonotificacaoanotacaos');
      expect(element.all(by.repeater('repeticaonotificacaoanotacao in repeticaonotificacaoanotacaos')).count()).toEqual(0);
    });
  });
});
