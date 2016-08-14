'use strict';

/**
 * Module dependencies
 */
var anotacaosPolicy = require('../policies/anotacaos.server.policy'),
  anotacaos = require('../controllers/anotacaos.server.controller');

module.exports = function(app) {
  // Anotacaos Routes
  app.route('/api/anotacaos').all(anotacaosPolicy.isAllowed)
    .get(anotacaos.list)
    .post(anotacaos.create);

  app.route('/api/anotacaos/:anotacaoId').all(anotacaosPolicy.isAllowed)
    .get(anotacaos.read)
    .put(anotacaos.update)
    .delete(anotacaos.delete);

  // Finish by binding the Anotacao middleware
  app.param('anotacaoId', anotacaos.anotacaoByID);
};
