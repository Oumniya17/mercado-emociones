const mongoose =
  require("mongoose");

/* ===================================
   EMOTION SCHEMA
=================================== */

const emotionSchema =
  new mongoose.Schema(

    {

      nombre: {

        type: String,

        required: true,

        unique: true,

        trim: true
      },

      descripcion: {

        type: String,

        default: ""
      },

      tipo: {

        type: String,

        enum: [

          "positive",
          "negative",
          "neutral"
        ],

        default: "neutral"
      },

      intensidad: {

        type: Number,

        required: true,

        min: 1,

        max: 100
      },

      precioBase: {

        type: Number,

        required: true,

        min: 0
      },

      volatilidad: {

        type: Number,

        default: 0
      },

      activa: {

        type: Boolean,

        default: true
      }

    },

    {

      timestamps: true
    }
  );

/* ===================================
   EXPORT
=================================== */

module.exports =
  mongoose.model(
    "Emotion",
    emotionSchema
  );