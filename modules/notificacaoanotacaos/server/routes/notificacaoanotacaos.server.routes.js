'use strict';

/**
 * Module dependencies
 */
var notificacaoanotacaosPolicy = require('../policies/notificacaoanotacaos.server.policy'),
  notificacaoanotacaos = require('../controllers/notificacaoanotacaos.server.controller');

module.exports = function(app) {
  // Notificacaoanotacaos Routes
  app.route('/api/notificacaoanotacaos').all(notificacaoanotacaosPolicy.isAllowed)
    .get(notificacaoanotacaos.list)
    .post(notificacaoanotacaos.create);

  app.route('/api/notificacaoanotacaos/:notificacaoanotacaoId').all(notificacaoanotacaosPolicy.isAllowed)
    .get(notificacaoanotacaos.read)
    .put(notificacaoanotacaos.update)
    .delete(notificacaoanotacaos.delete);

  // Finish by binding the Notificacaoanotacao middleware
  app.param('notificacaoanotacaoId', notificacaoanotacaos.notificacaoanotacaoByID);
};
