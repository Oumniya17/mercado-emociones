const Emocion = require("../models/Emocion");

// Crear emoción
const crearEmocion = async (req, res) => {
  try {
    const emocion = await Emocion.create(req.body);
    res.status(201).json(emocion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las emociones
const obtenerEmociones = async (req, res) => {
  try {
    const emociones = await Emocion.find();
    res.json(emociones);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener emoción por ID
const obtenerEmocionPorId = async (req, res) => {
  try {
    const emocion = await Emocion.findById(req.params.id);

    if (!emocion) {
      return res.status(404).json({ mensaje: "Emoción no encontrada" });
    }

    res.json(emocion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar emoción
const actualizarEmocion = async (req, res) => {
  try {
    const emocion = await Emocion.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!emocion) {
      return res.status(404).json({ mensaje: "Emoción no encontrada" });
    }

    res.json(emocion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar emoción
const eliminarEmocion = async (req, res) => {
  try {
    const emocion = await Emocion.findByIdAndDelete(req.params.id);

    if (!emocion) {
      return res.status(404).json({ mensaje: "Emoción no encontrada" });
    }

    res.json({ mensaje: "Emoción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  crearEmocion,
  obtenerEmociones,
  obtenerEmocionPorId,
  actualizarEmocion,
  eliminarEmocion
};
