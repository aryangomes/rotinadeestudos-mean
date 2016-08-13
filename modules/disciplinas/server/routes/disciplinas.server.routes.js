'use strict';

/**
 * Module dependencies
 */
var disciplinasPolicy = require('../policies/disciplinas.server.policy'),
  disciplinas = require('../controllers/disciplinas.server.controller');

module.exports = function(app) {
  // Disciplinas Routes
  app.route('/api/disciplinas').all(disciplinasPolicy.isAllowed)
    .get(disciplinas.list)
    .post(disciplinas.create);

  app.route('/api/disciplinas/:disciplinaId').all(disciplinasPolicy.isAllowed)
    .get(disciplinas.read)
    .put(disciplinas.update)
    .delete(disciplinas.delete);

  // Finish by binding the Disciplina middleware
  app.param('disciplinaId', disciplinas.disciplinaByID);
};
