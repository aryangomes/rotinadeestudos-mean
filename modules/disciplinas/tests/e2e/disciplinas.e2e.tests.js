'use strict';

describe('Disciplinas E2E Tests:', function () {
  describe('Test Disciplinas page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/disciplinas');
      expect(element.all(by.repeater('disciplina in disciplinas')).count()).toEqual(0);
    });
  });
});
