'use strict';

/**
 * Module dependencies
 */
var tipoanotacaosPolicy = require('../policies/tipoanotacaos.server.policy'),
  tipoanotacaos = require('../controllers/tipoanotacaos.server.controller');

module.exports = function(app) {
  // Tipoanotacaos Routes
  app.route('/api/tipoanotacaos').all(tipoanotacaosPolicy.isAllowed)
    .get(tipoanotacaos.list)
    .post(tipoanotacaos.create);

  app.route('/api/tipoanotacaos/:tipoanotacaoId').all(tipoanotacaosPolicy.isAllowed)
    .get(tipoanotacaos.read)
    .put(tipoanotacaos.update)
    .delete(tipoanotacaos.delete);

  // Finish by binding the Tipoanotacao middleware
  app.param('tipoanotacaoId', tipoanotacaos.tipoanotacaoByID);
};
