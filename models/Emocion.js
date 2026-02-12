const mongoose = require("mongoose");

const emocionSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre de la emoción es obligatorio"],
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    maxlength: [50, "El nombre no puede superar los 50 caracteres"]
  },
  tipo: {
    type: String,
    required: [true, "El tipo de emoción es obligatorio"],
    enum: {
      values: ["felicidad", "ira", "nostalgia", "ansiedad", "euforia", "culpa"],
      message: "Tipo de emoción no válido"
    }
  },
  intensidad: {
    type: Number,
    required: [true, "La intensidad es obligatoria"],
    min: [1, "La intensidad mínima es 1"],
    max: [100, "La intensidad máxima es 100"]
  },
  rareza: {
    type: String,
    enum: {
      values: ["comun", "rara", "epica", "legendaria"],
      message: "Nivel de rareza no válido"
    },
    default: "comun"
  },
  precioBase: {
    type: Number,
    required: [true, "El precio base es obligatorio"],
    min: [1, "El precio base no puede ser menor que 1"]
  },
  estable: {
    type: Boolean,
    default: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Emocion", emocionSchema);
