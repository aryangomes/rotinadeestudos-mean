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
    idDisciplina: {
        type: Schema.Types.ObjectId,
        required: true,
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
        required: false,
    },
    idTipoAnotacao: {
        type: Schema.Types.ObjectId,
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

mongoose.model('Anotacao', AnotacaoSchema);
