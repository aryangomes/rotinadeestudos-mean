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
  name: {
    type: String,
    default: '',
    required: 'Please fill Repeticaonotificacaoanotacao name',
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

mongoose.model('Repeticaonotificacaoanotacao', RepeticaonotificacaoanotacaoSchema);
