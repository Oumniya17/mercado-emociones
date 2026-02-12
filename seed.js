require("dotenv").config();
const mongoose = require("mongoose");

const Usuario = require("./models/Usuario");
const Emocion = require("./models/Emocion");
const Transaccion = require("./models/Transaccion");

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {

    console.log("Mongo conectado para seed...");

    // Limpiar base de datos
    await Usuario.deleteMany();
    await Emocion.deleteMany();
    await Transaccion.deleteMany();

    // Crear usuarios
    const usuarios = await Usuario.insertMany([
      {
        nombre: "Oumniya",
        email: "oum@email.com",
        saldoEmocional: 1000
      },
      {
        nombre: "Carlos",
        email: "carlos@email.com",
        saldoEmocional: 800
      },
      {
        nombre: "Lucía",
        email: "lucia@email.com",
        saldoEmocional: 1200
      }
    ]);

    // Crear emociones
    const emociones = await Emocion.insertMany([
      {
        nombre: "Felicidad Suprema",
        tipo: "felicidad",
        intensidad: 90,
        precioBase: 50
      },
      {
        nombre: "Ira Explosiva",
        tipo: "ira",
        intensidad: 80,
        precioBase: 40
      },
      {
        nombre: "Nostalgia Profunda",
        tipo: "nostalgia",
        intensidad: 70,
        precioBase: 30
      }
    ]);

    // Crear transacciones
    await Transaccion.insertMany([
      {
        comprador: usuarios[0]._id,
        emocion: emociones[0]._id,
        cantidad: 2,
        precioFinal: emociones[0].precioBase * 2,
        tipoOperacion: "compra",
        aprobada: true
      },
      {
        comprador: usuarios[1]._id,
        emocion: emociones[1]._id,
        cantidad: 1,
        precioFinal: emociones[1].precioBase * 1,
        tipoOperacion: "compra",
        aprobada: true
      }
    ]);

    console.log("Base de datos rellenada correctamente 🔥");
    process.exit();

  })
  .catch(err => console.error(err));
