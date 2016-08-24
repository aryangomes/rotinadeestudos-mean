'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Repeticaonotificacaoanotacao Schema
 */
var RepeticaonotificacaoanotacaoSchema = new Schema({
  tipoRepeticao: {
    type: String,
    required: true,
    maxLength: 45,
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

mongoose.model('Repeticaonotificacaoanotacao', RepeticaonotificacaoanotacaoSchema);
