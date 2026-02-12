const Usuario = require("../models/Usuario");

const bloquearColapsados = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.body.comprador);

    if (!usuario) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    if (usuario.estadoMental === "colapsado") {
      return res.status(403).json({
        mensaje: "Usuario colapsado. No puede realizar transacciones."
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = bloquearColapsados;
