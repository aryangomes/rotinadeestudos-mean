'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Notificacaoanotacao = mongoose.model('Notificacaoanotacao'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Notificacaoanotacao
 */
exports.create = function(req, res) {
  var notificacaoanotacao = new Notificacaoanotacao(req.body);
  notificacaoanotacao.user = req.user;

  notificacaoanotacao.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(notificacaoanotacao);
    }
  });
};

/**
 * Show the current Notificacaoanotacao
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var notificacaoanotacao = req.notificacaoanotacao ? req.notificacaoanotacao.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  notificacaoanotacao.isCurrentUserOwner = req.user && notificacaoanotacao.user && notificacaoanotacao.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(notificacaoanotacao);
};

/**
 * Update a Notificacaoanotacao
 */
exports.update = function(req, res) {
  var notificacaoanotacao = req.notificacaoanotacao ;

  notificacaoanotacao = _.extend(notificacaoanotacao , req.body);

  notificacaoanotacao.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(notificacaoanotacao);
    }
  });
};

/**
 * Delete an Notificacaoanotacao
 */
exports.delete = function(req, res) {
  var notificacaoanotacao = req.notificacaoanotacao ;

  notificacaoanotacao.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(notificacaoanotacao);
    }
  });
};

/**
 * List of Notificacaoanotacaos
 */
exports.list = function(req, res) { 
  Notificacaoanotacao.find().sort('-created').populate('user', 'displayName').exec(function(err, notificacaoanotacaos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(notificacaoanotacaos);
    }
  });
};

/**
 * Notificacaoanotacao middleware
 */
exports.notificacaoanotacaoByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Notificacaoanotacao is invalid'
    });
  }

  Notificacaoanotacao.findById(id).populate('user', 'displayName').exec(function (err, notificacaoanotacao) {
    if (err) {
      return next(err);
    } else if (!notificacaoanotacao) {
      return res.status(404).send({
        message: 'No Notificacaoanotacao with that identifier has been found'
      });
    }
    req.notificacaoanotacao = notificacaoanotacao;
    next();
  });
};
