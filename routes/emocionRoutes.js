const express = require("express");
const router = express.Router();

const {
  crearEmocion,
  obtenerEmociones,
  obtenerEmocionPorId,
  actualizarEmocion,
  eliminarEmocion
} = require("../controllers/emocionController");

router.post("/", crearEmocion);
router.get("/", obtenerEmociones);
router.get("/:id", obtenerEmocionPorId);
router.put("/:id", actualizarEmocion);
router.delete("/:id", eliminarEmocion);

module.exports = router;
