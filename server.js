require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const usuarioRoutes = require("./routes/usuarioRoutes");
const emocionRoutes = require("./routes/emocionRoutes");
const transaccionRoutes = require("./routes/transaccionRoutes");



const app = express();

// Conectar base de datos
connectDB();

// Middleware para leer JSON
app.use(express.json());

// Servir archivos estáticos (frontend)
app.use(express.static("public"));

app.use("/usuarios", usuarioRoutes);
app.use("/emociones", emocionRoutes);
app.use("/transacciones", transaccionRoutes);



// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ mensaje: "Servidor funcionando 🚀" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
