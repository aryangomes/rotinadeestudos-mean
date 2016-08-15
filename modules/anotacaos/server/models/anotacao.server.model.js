'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

/**
 * Anotacao Schema
 */
var AnotacaoSchema = new Schema({
    disciplina: {
        type: Schema.ObjectId,
          ref:'Disciplina',
    },
    titulo: {
        type: String,
        maxlength: 100,
        required: 'Título da Anotação é obrigatório',
        trim: true
    },
    anotacao: {
        type: String,
        maxlength: 500,
        default: '',
        required: false,
    },
    tipoanotacao: {
        type: Schema.ObjectId,
        required: true,
        ref:'Tipoanotacao',
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

mongoose.model('Anotacao', AnotacaoSchema);
