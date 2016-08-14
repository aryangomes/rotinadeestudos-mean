'use strict';

describe('Anotacaos E2E Tests:', function () {
  describe('Test Anotacaos page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/anotacaos');
      expect(element.all(by.repeater('anotacao in anotacaos')).count()).toEqual(0);
    });
  });
});
