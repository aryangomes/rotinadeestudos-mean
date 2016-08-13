'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Disciplina = mongoose.model('Disciplina'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Disciplina
 */
exports.create = function(req, res) {
  var disciplina = new Disciplina(req.body);
  disciplina.user = req.user;

  disciplina.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(disciplina);
    }
  });
};

/**
 * Show the current Disciplina
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var disciplina = req.disciplina ? req.disciplina.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  disciplina.isCurrentUserOwner = req.user && disciplina.user && disciplina.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(disciplina);
};

/**
 * Update a Disciplina
 */
exports.update = function(req, res) {
  var disciplina = req.disciplina ;

  disciplina = _.extend(disciplina , req.body);

  disciplina.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(disciplina);
    }
  });
};

/**
 * Delete an Disciplina
 */
exports.delete = function(req, res) {
  var disciplina = req.disciplina ;

  disciplina.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(disciplina);
    }
  });
};

/**
 * List of Disciplinas
 */
exports.list = function(req, res) { 
  Disciplina.find().sort('-created').populate('user', 'displayName').exec(function(err, disciplinas) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(disciplinas);
    }
  });
};

/**
 * Disciplina middleware
 */
exports.disciplinaByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Disciplina is invalid'
    });
  }

  Disciplina.findById(id).populate('user', 'displayName').exec(function (err, disciplina) {
    if (err) {
      return next(err);
    } else if (!disciplina) {
      return res.status(404).send({
        message: 'No Disciplina with that identifier has been found'
      });
    }
    req.disciplina = disciplina;
    next();
  });
};
