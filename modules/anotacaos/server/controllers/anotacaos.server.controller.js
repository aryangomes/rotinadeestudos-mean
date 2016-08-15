'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Anotacao = mongoose.model('Anotacao'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Anotacao
 */
exports.create = function(req, res) {
  var anotacao = new Anotacao(req.body);
  console.log('anotacao: '+anotacao);
  anotacao.user = req.user;

  anotacao.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(anotacao);
    }
  });
};

/**
 * Show the current Anotacao
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var anotacao = req.anotacao ? req.anotacao.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  anotacao.isCurrentUserOwner = req.user && anotacao.user && anotacao.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(anotacao);
};

/**
 * Update a Anotacao
 */
exports.update = function(req, res) {
  var anotacao = req.anotacao ;

  anotacao = _.extend(anotacao , req.body);

  anotacao.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(anotacao);
    }
  });
};

/**
 * Delete an Anotacao
 */
exports.delete = function(req, res) {
  var anotacao = req.anotacao ;

  anotacao.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(anotacao);
    }
  });
};

/**
 * List of Anotacaos
 */
exports.list = function(req, res) { 
  Anotacao.find().sort('-created').populate(['user', 'displayName', 'disciplina','disciplina','tipoanotacao','tipoAnotacao']).exec(function(err, anotacaos) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(anotacaos);
    }
  });
};

/**
 * Anotacao middleware
 */
exports.anotacaoByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Anotacao is invalid'
    });
  }

  Anotacao.findById(id).populate('user', 'displayName').exec(function (err, anotacao) {
    if (err) {
      return next(err);
    } else if (!anotacao) {
      return res.status(404).send({
        message: 'No Anotacao with that identifier has been found'
      });
    }
    req.anotacao = anotacao;
    next();
  });
};
