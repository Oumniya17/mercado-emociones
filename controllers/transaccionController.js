const Transaccion = require("../models/Transaccion");
const Usuario = require("../models/Usuario");
const Emocion = require("../models/Emocion");


// Crear Transaccion
const crearTransaccion = async (req, res) => {
  try {
    const { comprador, emocion, cantidad, tipoOperacion } = req.body;

    const usuario = await Usuario.findById(comprador);
    const emocionDB = await Emocion.findById(emocion);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (!emocionDB) {
      return res.status(404).json({ mensaje: "Emoción no encontrada" });
    }

    const precioFinal = emocionDB.precioBase * cantidad;

    // Validación saldo suficiente
    if (tipoOperacion === "compra" && usuario.saldoEmocional < precioFinal) {
      return res.status(400).json({
        mensaje: "Saldo emocional insuficiente para realizar la compra"
      });
    }

    // Descontar saldo si es compra
    if (tipoOperacion === "compra") {
      usuario.saldoEmocional -= precioFinal;
      await usuario.save();
    }

    const transaccion = await Transaccion.create({
      comprador,
      emocion,
      cantidad,
      precioFinal,
      tipoOperacion,
      aprobada: true
    });

    res.status(201).json(transaccion);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Obtener todas las Transacciones
const obtenerTransacciones = async (req, res) => {
  try {
    const transacciones = await Transaccion.find()
      .populate("comprador")
      .populate("emocion");

    res.json(transacciones);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Obtener Transaccion Por Id
const obtenerTransaccionPorId = async (req, res) => {
  try {
    const transaccion = await Transaccion.findById(req.params.id)
      .populate("comprador")
      .populate("emocion");

    if (!transaccion) {
      return res.status(404).json({ mensaje: "Transacción no encontrada" });
    }

    res.json(transaccion);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Actualizar Transaccion
const actualizarTransaccion = async (req, res) => {
  try {
    const transaccion = await Transaccion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!transaccion) {
      return res.status(404).json({ mensaje: "Transacción no encontrada" });
    }

    res.json(transaccion);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Eliminar Transaccion
const eliminarTransaccion = async (req, res) => {
  try {
    const transaccion = await Transaccion.findByIdAndDelete(req.params.id);

    if (!transaccion) {
      return res.status(404).json({ mensaje: "Transacción no encontrada" });
    }

    res.json({ mensaje: "Transacción eliminada correctamente" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ENDPOINT EXTRA: Emoción más vendida
const emocionMasVendida = async (req, res) => {
  try {
    const resultado = await Transaccion.aggregate([
      { $match: { tipoOperacion: "compra" } },
      { $group: { _id: "$emocion", totalVendidas: { $sum: "$cantidad" } } },
      { $sort: { totalVendidas: -1 } },
      { $limit: 1 }
    ]);

    if (resultado.length === 0) {
      return res.status(404).json({ mensaje: "No hay ventas registradas" });
    }

    const emocion = await Emocion.findById(resultado[0]._id);

    res.json({
      emocionMasVendida: emocion,
      totalVendidas: resultado[0].totalVendidas
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {
  crearTransaccion,
  obtenerTransacciones,
  obtenerTransaccionPorId,
  actualizarTransaccion,
  eliminarTransaccion,
  emocionMasVendida
};
