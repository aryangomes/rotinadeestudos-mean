'use strict';

/**
 * Module dependencies
 */
var atividadediariaPolicy = require('../policies/atividadediaria.server.policy'),
  atividadediaria = require('../controllers/atividadediaria.server.controller');

module.exports = function(app) {
  // Atividadediaria Routes
  app.route('/api/atividadediaria').all(atividadediariaPolicy.isAllowed)
    .get(atividadediaria.list)
    .post(atividadediaria.create);

  app.route('/api/atividadediaria/:atividadediariumId').all(atividadediariaPolicy.isAllowed)
    .get(atividadediaria.read)
    .put(atividadediaria.update)
    .delete(atividadediaria.delete);

  // Finish by binding the Atividadediarium middleware
  app.param('atividadediariumId', atividadediaria.atividadediariumByID);
};
