const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth"); 
const role = require("../middleware/role");

const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
  usuarioConMasSaldo
} = require("../controllers/usuarioController");

router.post("/", crearUsuario);

// PROTEGIDAS (login requerido)
router.get("/", auth, obtenerUsuarios);
router.get("/mayor-saldo", auth, usuarioConMasSaldo);
router.get("/:id", auth, obtenerUsuarioPorId);

// SOLO ADMIN
router.put("/:id", auth, role("admin"), actualizarUsuario);
router.delete("/:id", auth, role("admin"), eliminarUsuario);

module.exports = router;