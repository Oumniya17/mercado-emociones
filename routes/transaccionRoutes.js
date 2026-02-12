const express = require("express");
const router = express.Router();

const {
  crearTransaccion,
  obtenerTransacciones,
  obtenerTransaccionPorId,
  actualizarTransaccion,
  eliminarTransaccion,
  emocionMasVendida
} = require("../controllers/transaccionController");

const bloquearColapsados = require("../middleware/bloquearColapsados");

// CREATE
router.post("/", bloquearColapsados, crearTransaccion);

// READ
router.get("/", obtenerTransacciones);
router.get("/emocion-mas-vendida", emocionMasVendida);
router.get("/:id", obtenerTransaccionPorId);

// UPDATE
router.put("/:id", actualizarTransaccion);

// DELETE
router.delete("/:id", eliminarTransaccion);

module.exports = router;
