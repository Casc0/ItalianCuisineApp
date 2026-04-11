const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  // ObjectId es la referencia al _id del documento en otra colección
  recipeId:  { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User',   required: true },
  valor:     { type: Number, required: true, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

// Índice compuesto único: un usuario solo puede tener una valoración por receta
// Si se intenta insertar otro con el mismo par, MongoDB lanza error 11000
ratingSchema.index({ recipeId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Rating', ratingSchema);
