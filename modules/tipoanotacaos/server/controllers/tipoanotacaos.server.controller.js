'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Tipoanotacao = mongoose.model('Tipoanotacao'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Tipoanotacao
 */
exports.create = function(req, res) {
  var tipoanotacao = new Tipoanotacao(req.body);
  tipoanotacao.user = req.user;

  tipoanotacao.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tipoanotacao);
    }
  });
};

/**
 * Show the current Tipoanotacao
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var tipoanotacao = req.tipoanotacao ? req.tipoanotacao.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  tipoanotacao.isCurrentUserOwner = req.user && tipoanotacao.user && tipoanotacao.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(tipoanotacao);
};

/**
 * Update a Tipoanotacao
 */
exports.update = function(req, res) {
  var tipoanotacao = req.tipoanotacao ;

  tipoanotacao = _.extend(tipoanotacao , req.body);

  tipoanotacao.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tipoanotacao);
    }
  });
};

/**
 * Delete an Tipoanotacao
 */
exports.delete = function(req, res) {
  var tipoanotacao = req.tipoanotacao ;

  tipoanotacao.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tipoanotacao);
    }
  });
};

/**
 * List of Tipoanotacaos
 */
exports.list = function(req, res) { 
  Tipoanotacao.find().sort('-created').populate('user', 'displayName').exec(function(err, tipoanotacaos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(tipoanotacaos);
    }
  });
};

/**
 * Tipoanotacao middleware
 */
exports.tipoanotacaoByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Tipoanotacao is invalid'
    });
  }

  Tipoanotacao.findById(id).populate('user', 'displayName').exec(function (err, tipoanotacao) {
    if (err) {
      return next(err);
    } else if (!tipoanotacao) {
      return res.status(404).send({
        message: 'No Tipoanotacao with that identifier has been found'
      });
    }
    req.tipoanotacao = tipoanotacao;
    next();
  });
};
