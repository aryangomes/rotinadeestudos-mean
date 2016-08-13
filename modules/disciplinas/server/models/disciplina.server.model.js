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
  name: {
    type: String,
    default: '',
    required: 'Please fill Disciplina name',
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
