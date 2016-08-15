'use strict';

describe('Atividadediaria E2E Tests:', function () {
  describe('Test Atividadediaria page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/atividadediaria');
      expect(element.all(by.repeater('atividadediarium in atividadediaria')).count()).toEqual(0);
    });
  });
});
