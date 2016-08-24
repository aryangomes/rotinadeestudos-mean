'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Atividadediarium = mongoose.model('Atividadediarium'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Atividadediarium
 */
exports.create = function(req, res) {
  var atividadediarium = new Atividadediarium(req.body);
  atividadediarium.user = req.user;

  atividadediarium.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(atividadediarium);
    }
  });
};

/**
 * Show the current Atividadediarium
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var atividadediarium = req.atividadediarium ? req.atividadediarium.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  atividadediarium.isCurrentUserOwner = req.user && atividadediarium.user && atividadediarium.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(atividadediarium);
};

/**
 * Update a Atividadediarium
 */
exports.update = function(req, res) {
  var atividadediarium = req.atividadediarium ;

  atividadediarium = _.extend(atividadediarium , req.body);

  atividadediarium.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(atividadediarium);
    }
  });
};

/**
 * Delete an Atividadediarium
 */
exports.delete = function(req, res) {
  var atividadediarium = req.atividadediarium ;

  atividadediarium.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(atividadediarium);
    }
  });
};

/**
 * List of Atividadediaria
 */
exports.list = function(req, res) { 
  Atividadediarium.find().sort('-created').populate('user', 'displayName').exec(function(err, atividadediaria) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(atividadediaria);
    }
  });
};

/**
 * Atividadediarium middleware
 */
exports.atividadediariumByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Atividadediarium is invalid'
    });
  }

  Atividadediarium.findById(id).populate('user', 'displayName').exec(function (err, atividadediarium) {
    if (err) {
      return next(err);
    } else if (!atividadediarium) {
      return res.status(404).send({
        message: 'No Atividadediarium with that identifier has been found'
      });
    }
    req.atividadediarium = atividadediarium;
    next();
  });
};
