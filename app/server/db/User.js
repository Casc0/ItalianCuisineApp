const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nombre:       { type: String, required: true },
  // unique: true crea un índice en MongoDB que rechaza emails duplicados
  // lowercase y trim normalizan el valor antes de guardarlo
  email:        { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true }, // NUNCA guardar la contraseña en texto plano
  createdAt:    { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
