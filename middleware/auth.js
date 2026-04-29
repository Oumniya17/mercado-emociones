const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // No hay header
  if (!authHeader) {
    return res.status(401).json({ error: "No autorizado" });
  }

  // Formato incorrecto
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(400).json({ error: "Formato de token inválido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Guardamos info del usuario en la request
    req.user = decoded;

    next();

  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};