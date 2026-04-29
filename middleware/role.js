module.exports = (role) => {
  return (req, res, next) => {

    // No hay usuario (por si falla auth)
    if (!req.user || !req.user.roles) {
      return res.status(401).json({ error: "No autorizado" });
    }

    // No tiene el rol requerido
    if (!req.user.roles.includes(role)) {
      return res.status(403).json({ error: "Acceso denegado" });
    }

    next();
  };
};