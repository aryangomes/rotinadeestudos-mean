'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Tipoanotacao Schema
 */
var TipoanotacaoSchema = new Schema({
  tipoAnotacao: {
    type: String,
    maxlength: 100,
    required: 'Please fill Tipoanotacao name',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Tipoanotacao', TipoanotacaoSchema);
