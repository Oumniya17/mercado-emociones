const express = require("express");
const router = express.Router();

const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  usuarioConMasSaldo
} = require("../controllers/usuarioController");

router.post("/", crearUsuario);
router.get("/", obtenerUsuarios);
router.get("/mayor-saldo", usuarioConMasSaldo);
router.get("/:id", obtenerUsuarioPorId);
router.put("/:id", actualizarUsuario);
router.delete("/:id", eliminarUsuario);

module.exports = router;
