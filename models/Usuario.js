const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    maxlength: [50, "El nombre no puede superar los 50 caracteres"]
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"]
  },
  saldoEmocional: {
    type: Number,
    required: [true, "El saldo emocional es obligatorio"],
    min: [0, "El saldo emocional no puede ser negativo"],
    default: 100
  },
  estadoMental: {
    type: String,
    enum: {
      values: ["estable", "inestable", "euforico", "colapsado"],
      message: "Estado mental no válido"
    },
    default: "estable"
  },
  nivelRiesgo: {
    type: Number,
    min: [1, "El nivel mínimo de riesgo es 1"],
    max: [10, "El nivel máximo de riesgo es 10"],
    default: 5
  },
  activo: {
    type: Boolean,
    default: true
  },
  fechaRegistro: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Usuario", usuarioSchema);
