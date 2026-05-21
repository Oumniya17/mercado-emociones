const Transaction =
  require("../models/Transaction");

const Emotion =
  require("../models/Emotion");

const User =
  require("../models/User");

/* ===================================
   CREATE TRANSACTION
=================================== */

const createTransaction =
  async (req, res) => {

    try {

      const {

        emocion,
        cantidad,
        tipoOperacion

      } = req.body;

      // FIND EMOTION
      const emotion =
        await Emotion.findById(
          emocion
        );

      if (!emotion) {

        return res.status(404).json({

          success: false,

          message:
            "Emotion not found"
        });
      }

      // FIND USER
      const user =
        await User.findById(
          req.user._id
        );

      // TOTAL
      const total =

        cantidad *

        emotion.precioBase;

      // BUY
      if (
        tipoOperacion === "buy"
      ) {

        if (
          user.saldoEmocional <
          total
        ) {

          return res.status(400).json({

            success: false,

            message:
              "Insufficient balance"
          });
        }

        user.saldoEmocional -=
          total;
      }

      // SELL
      if (
        tipoOperacion === "sell"
      ) {

        user.saldoEmocional +=
          total;
      }

      // SAVE USER
      await user.save();

      // CREATE TRANSACTION
      const transaction =
        await Transaction.create({

          usuario:
            user._id,

          emocion:
            emotion._id,

          cantidad,

          precioUnitario:
            emotion.precioBase,

          tipoOperacion
        });

      return res.status(201).json({

        success: true,

        transaction
      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message
      });
    }
  };

/* ===================================
   GET TRANSACTIONS
=================================== */

const getTransactions =
  async (req, res) => {

    try {

      const transactions =
        await Transaction.find()

          .populate(
            "usuario",
            "nombre email"
          )

          .populate(
            "emocion",
            "nombre tipo"
          )

          .sort({
            createdAt: -1
          });

      return res.status(200).json({

        success: true,

        transactions
      });

    } catch (error) {

      return res.status(500).json({

        success: false,

        message:
          error.message
      });
    }
  };

/* ===================================
   EXPORTS
=================================== */

module.exports = {

  createTransaction,

  getTransactions
};