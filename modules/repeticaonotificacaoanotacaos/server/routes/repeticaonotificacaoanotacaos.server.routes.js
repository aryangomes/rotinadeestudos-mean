'use strict';

/**
 * Module dependencies
 */
var repeticaonotificacaoanotacaosPolicy = require('../policies/repeticaonotificacaoanotacaos.server.policy'),
  repeticaonotificacaoanotacaos = require('../controllers/repeticaonotificacaoanotacaos.server.controller');

module.exports = function(app) {
  // Repeticaonotificacaoanotacaos Routes
  app.route('/api/repeticaonotificacaoanotacaos').all(repeticaonotificacaoanotacaosPolicy.isAllowed)
    .get(repeticaonotificacaoanotacaos.list)
    .post(repeticaonotificacaoanotacaos.create);

  app.route('/api/repeticaonotificacaoanotacaos/:repeticaonotificacaoanotacaoId').all(repeticaonotificacaoanotacaosPolicy.isAllowed)
    .get(repeticaonotificacaoanotacaos.read)
    .put(repeticaonotificacaoanotacaos.update)
    .delete(repeticaonotificacaoanotacaos.delete);

  // Finish by binding the Repeticaonotificacaoanotacao middleware
  app.param('repeticaonotificacaoanotacaoId', repeticaonotificacaoanotacaos.repeticaonotificacaoanotacaoByID);
};
