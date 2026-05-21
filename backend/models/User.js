const mongoose =
  require("mongoose");

const bcrypt =
  require("bcryptjs");

/* ===================================
   USER SCHEMA
=================================== */

const userSchema =
  new mongoose.Schema(

    {

      nombre: {

        type: String,

        required: true,

        trim: true
      },

      email: {

        type: String,

        required: true,

        unique: true,

        lowercase: true,

        trim: true
      },

      password: {

        type: String,

        required: true,

        minlength: 6
      },

      rol: {

        type: String,

        enum: [

          "admin",
          "user"
        ],

        default: "user"
      },

      saldoEmocional: {

        type: Number,

        default: 1000
      },

      refreshToken: {

        type: String,

        default: null
      }

    },

    {

      timestamps: true
    }
  );

/* ===================================
   HASH PASSWORD
=================================== */

userSchema.pre(
  "save",
  async function () {

    // Avoid rehash
    if (

      !this.isModified(
        "password"
      )

    ) {

      return;
    }

    // Generate salt
    const salt =
      await bcrypt.genSalt(10);

    // Hash password
    this.password =
      await bcrypt.hash(

        this.password,

        salt
      );
  }
);

/* ===================================
   COMPARE PASSWORD
=================================== */

userSchema.methods.comparePassword =
  async function (
    candidatePassword
  ) {

    return await bcrypt.compare(

      candidatePassword,

      this.password
    );
  };

/* ===================================
   EXPORT
=================================== */

module.exports =
  mongoose.model(

    "User",

    userSchema
  );