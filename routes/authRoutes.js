const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");


// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // comprobar si existe
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        error: "El usuario ya existe"
      });
    }

    const user = new User({
      username,
      password
    });

    await user.save();

    res.status(201).json({
      message: "Usuario registrado correctamente"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message
    });
  }
});


// LOGIN
router.post("/login", async (req, res) => {
  try {

    const { username, password } = req.body;

    // buscar usuario
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        error: "Usuario no encontrado"
      });
    }

    // validar contraseña
    const validPassword = await user.comparePassword(password);

    if (!validPassword) {
      return res.status(401).json({
        error: "Contraseña incorrecta"
      });
    }

    // ACCESS TOKEN
    const accessToken = jwt.sign(
      {
        id: user._id,
        roles: user.roles
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES
      }
    );

    // REFRESH TOKEN
    const refreshToken = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES
      }
    );

    res.json({
      accessToken,
      refreshToken
    });

  } catch (error) {

    res.status(500).json({
      error: "Error en login"
    });

  }
});


// REFRESH TOKEN
router.post("/refresh", (req, res) => {

  try {

    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        error: "Refresh token requerido"
      });
    }

    // verificar refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    );

    // generar nuevo access token
    const newAccessToken = jwt.sign(
      {
        id: decoded.id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES
      }
    );

    res.json({
      accessToken: newAccessToken
    });

  } catch (error) {

    res.status(403).json({
      error: "Refresh token inválido o expirado"
    });

  }
});


module.exports = router;