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
  dataHoraInicio: {
     type: Date,
  },
  dataHoraFim: {
     type: Date,
  },
  anotacao: {
        type: Schema.ObjectId,
          ref:'Anotacao',
    },
    disciplina: {
        type: Schema.ObjectId,
          ref:'Disciplina',
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
