'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Repeticaonotificacaoanotacao = mongoose.model('Repeticaonotificacaoanotacao'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Repeticaonotificacaoanotacao
 */
exports.create = function(req, res) {
  var repeticaonotificacaoanotacao = new Repeticaonotificacaoanotacao(req.body);
  repeticaonotificacaoanotacao.user = req.user;

  repeticaonotificacaoanotacao.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(repeticaonotificacaoanotacao);
    }
  });
};

/**
 * Show the current Repeticaonotificacaoanotacao
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var repeticaonotificacaoanotacao = req.repeticaonotificacaoanotacao ? req.repeticaonotificacaoanotacao.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  repeticaonotificacaoanotacao.isCurrentUserOwner = req.user && repeticaonotificacaoanotacao.user && repeticaonotificacaoanotacao.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(repeticaonotificacaoanotacao);
};

/**
 * Update a Repeticaonotificacaoanotacao
 */
exports.update = function(req, res) {
  var repeticaonotificacaoanotacao = req.repeticaonotificacaoanotacao ;

  repeticaonotificacaoanotacao = _.extend(repeticaonotificacaoanotacao , req.body);

  repeticaonotificacaoanotacao.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(repeticaonotificacaoanotacao);
    }
  });
};

/**
 * Delete an Repeticaonotificacaoanotacao
 */
exports.delete = function(req, res) {
  var repeticaonotificacaoanotacao = req.repeticaonotificacaoanotacao ;

  repeticaonotificacaoanotacao.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(repeticaonotificacaoanotacao);
    }
  });
};

/**
 * List of Repeticaonotificacaoanotacaos
 */
exports.list = function(req, res) { 
  Repeticaonotificacaoanotacao.find().sort('-created').populate('user', 'displayName').exec(function(err, repeticaonotificacaoanotacaos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(repeticaonotificacaoanotacaos);
    }
  });
};

/**
 * Repeticaonotificacaoanotacao middleware
 */
exports.repeticaonotificacaoanotacaoByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Repeticaonotificacaoanotacao is invalid'
    });
  }

  Repeticaonotificacaoanotacao.findById(id).populate('user', 'displayName').exec(function (err, repeticaonotificacaoanotacao) {
    if (err) {
      return next(err);
    } else if (!repeticaonotificacaoanotacao) {
      return res.status(404).send({
        message: 'No Repeticaonotificacaoanotacao with that identifier has been found'
      });
    }
    req.repeticaonotificacaoanotacao = repeticaonotificacaoanotacao;
    next();
  });
};
