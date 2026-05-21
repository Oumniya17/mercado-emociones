const mongoose =
  require("mongoose");

/* ===================================
   TRANSACTION SCHEMA
=================================== */

const transactionSchema =
  new mongoose.Schema(

    {

      usuario: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true
      },

      emocion: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Emotion",

        required: true
      },

      cantidad: {

        type: Number,

        required: true,

        min: 1
      },

      precioUnitario: {

        type: Number,

        required: true,

        min: 0
      },

      precioTotal: {

        type: Number,

        required: true,

        min: 0
      },

      tipoOperacion: {

        type: String,

        enum: [

          "buy",
          "sell"
        ],

        default: "buy"
      },

      estado: {

        type: String,

        enum: [

          "pending",
          "completed",
          "cancelled"
        ],

        default: "completed"
      }

    },

    {

      timestamps: true
    }
  );

/* ===================================
   AUTO CALCULATE TOTAL
=================================== */

transactionSchema.pre(
  "validate",
  function () {

    this.precioTotal =

      this.cantidad *

      this.precioUnitario;
  }
);

/* ===================================
   EXPORT
=================================== */

module.exports =
  mongoose.model(
    "Transaction",
    transactionSchema
  );