require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const connectDB = require("./config/db");

const usuarioRoutes = require("./routes/usuarioRoutes");
const emocionRoutes = require("./routes/emocionRoutes");
const transaccionRoutes = require("./routes/transaccionRoutes");
const authRoutes = require("./routes/authRoutes");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

const app = express();


// cargar openapi
const swaggerDocument = YAML.load("./openapi.yaml");


// conectar DB
connectDB();


// middleware
app.use(express.json());


// logs
app.use(morgan("dev"));


// frontend
app.use(express.static("public"));


// rutas API
app.use("/usuarios", usuarioRoutes);
app.use("/emociones", emocionRoutes);
app.use("/transacciones", transaccionRoutes);
app.use("/auth", authRoutes);


// swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


// HEALTH CHECK
app.get("/health", async (req, res) => {

  const dbState = mongoose.connection.readyState;

  const dbStatus =
    dbState === 1 ? "connected" : "disconnected";

  res.status(200).json({
    status: "OK",
    database: dbStatus,
    uptime: process.uptime(),
    timestamp: new Date()
  });

});


// ruta principal
app.get("/", (req, res) => {
  res.json({
    mensaje: "Servidor funcionando 🚀"
  });
});


const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});