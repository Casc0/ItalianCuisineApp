const mongoose = require('mongoose');

const ingredienteSchema = new mongoose.Schema({
  nombre:   { type: String, required: true },
  cantidad: { type: Number, default: null },
  unidad:   { type: String, default: null },
  nota:     { type: String, default: null },
}, { _id: false });

const pasoSchema = new mongoose.Schema({
  orden:       { type: Number, required: true },
  descripcion: { type: String, required: true },
}, { _id: false });

const recipeSchema = new mongoose.Schema({
  slug:            { type: String, required: true, unique: true },
  nombre:          { type: String, required: true },
  imagenPrincipal: { type: String },
  descripcion:     { type: String },

  categorias: {
    tiempoMinutos: { type: Number },
    tiempoNota:    { type: String },
    dificultad:    { type: String, enum: ['Fácil', 'Medio', 'Difícil'] },
    porciones:     { type: Number },
    porcionesNota: { type: String },
    region:        { type: String },
  },

  ingredientes:    [ingredienteSchema],
  pasos:           [pasoSchema],
  consejo:         { type: String },
  identificadores: [String],

  valoracion: {
    promedio: { type: Number, default: 0 },
    total:    { type: Number, default: 0 },
  },

  creadaPor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
}, {
  timestamps: true, // auto-manages createdAt and updatedAt
});

module.exports = mongoose.model('Recipe', recipeSchema);
