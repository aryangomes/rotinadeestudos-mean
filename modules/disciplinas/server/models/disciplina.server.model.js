'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Disciplina Schema
 */
var DisciplinaSchema = new Schema({
  disciplina: {
    type: String,
    
    required: 'Disciplina é obrigatória',
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

mongoose.model('Disciplina', DisciplinaSchema);
