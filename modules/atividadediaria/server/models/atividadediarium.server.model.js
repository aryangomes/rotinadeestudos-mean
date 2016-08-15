'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Atividadediarium Schema
 */
var AtividadediariumSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Atividadediarium name',
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

mongoose.model('Atividadediarium', AtividadediariumSchema);
