const mongoose = require("mongoose");

const transaccionSchema = new mongoose.Schema({
  comprador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: [true, "El comprador es obligatorio"]
  },
  emocion: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Emocion",
    required: [true, "La emoción es obligatoria"]
  },
  cantidad: {
    type: Number,
    required: [true, "La cantidad es obligatoria"],
    min: [1, "La cantidad mínima es 1"]
  },
  precioFinal: {
    type: Number,
    required: [true, "El precio final es obligatorio"],
    min: [1, "El precio final debe ser mayor que 0"]
  },
  tipoOperacion: {
    type: String,
    enum: {
      values: ["compra", "venta", "intercambio"],
      message: "Tipo de operación no válido"
    },
    required: [true, "El tipo de operación es obligatorio"]
  },
  aprobada: {
    type: Boolean,
    default: false
  },
  fechaTransaccion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Transaccion", transaccionSchema);
