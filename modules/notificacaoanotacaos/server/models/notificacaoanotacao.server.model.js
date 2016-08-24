'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Notificacaoanotacao Schema
 */
var NotificacaoanotacaoSchema = new Schema({
  
  anotacao : {
     type: Schema.ObjectId, 
   ref: 'Anotacao',

  },

  disciplina: {

    type: Schema.ObjectId, 
    ref: 'Disciplina',

  },

  repeticaoNotificacao: {

    
    type: Schema.ObjectId, 
    ref: 'Repeticaonotificacaoanotacao',


  },

  dataHora:{

      type: Date,
      required: true,

  },

  qtdRepeticao: {

      type: Number,

  },
  
  estaAtivado:{

    type: Boolean,
    required: true,

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

mongoose.model('Notificacaoanotacao', NotificacaoanotacaoSchema);
