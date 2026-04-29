const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");


//REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // comprobar si existe
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const user = new User({ username, password });
    await user.save();

    res.status(201).json({ message: "Usuario registrado correctamente" });

  } catch (error) {
  console.log(error); // muestra el error en consola
  res.status(500).json({ error: error.message }); // muestra el error real
}
});


//LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, roles: user.roles },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({ token });

  } catch (error) {
    res.status(500).json({ error: "Error en login" });
  }
});


//REFRESH TOKEN
router.post("/refresh", (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(401).json({ error: "Token requerido" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newToken = jwt.sign(
      { id: decoded.id, roles: decoded.roles },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    res.json({ token: newToken });

  } catch (error) {
    res.status(403).json({ error: "Token inválido" });
  }
});


module.exports = router;