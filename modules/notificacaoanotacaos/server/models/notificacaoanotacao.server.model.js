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
  idNotificao: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  idAnotacao : {
    type: Schema.Types.ObjectId,
    required: true,

  },

  idAnotacaoDisciplina: {

    type: Schema.Types.ObjectId,
    required: true,

  },

  idRepeticaoNotificacao: {

    type: Schema.Types.ObjectId,
    required: true,

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

 /* type: String,
  maxlength: 100,
  required: 'Título da Anotação é obrigatório',
  trim: true
   */
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
