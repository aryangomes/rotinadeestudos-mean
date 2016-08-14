'use strict';

describe('Tipoanotacaos E2E Tests:', function () {
  describe('Test Tipoanotacaos page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/tipoanotacaos');
      expect(element.all(by.repeater('tipoanotacao in tipoanotacaos')).count()).toEqual(0);
    });
  });
});
