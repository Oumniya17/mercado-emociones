require("dotenv")
  .config();

/* ===================================
   APP
=================================== */

const app =
  require("./app");

const User =
  require("./models/User");

/* ===================================
   SEED USERS
=================================== */

const seedUsers =
  async () => {

    try {

      // DELETE USERS
      await User.deleteMany({});

      const users = [

        {
          nombre: "Admin",
          email: "admin@test.com",
          password: "123456",
          rol: "admin",
          saldoEmocional: 10000
        },

        {
          nombre: "Neo",
          email: "neo@test.com",
          password: "123456",
          rol: "user",
          saldoEmocional: 2500
        },

        {
          nombre: "Ghost",
          email: "ghost@test.com",
          password: "123456",
          rol: "user",
          saldoEmocional: 5200
        },

        {
          nombre: "Oracle",
          email: "oracle@test.com",
          password: "123456",
          rol: "admin",
          saldoEmocional: 15000
        },

        {
          nombre: "Cipher",
          email: "cipher@test.com",
          password: "123456",
          rol: "user",
          saldoEmocional: 1800
        },

        {
          nombre: "Trinity",
          email: "trinity@test.com",
          password: "123456",
          rol: "user",
          saldoEmocional: 7600
        },

        {
          nombre: "Morpheus",
          email: "morpheus@test.com",
          password: "123456",
          rol: "admin",
          saldoEmocional: 20000
        }
      ];

      // SAVE USERS
      for (const data of users) {

        const user =
          new User(data);

        await user.save();
      }

      console.log(
        "✅ Users seeded"
      );

    } catch (error) {

      console.error(
        error.message
      );
    }
  };

/* ===================================
   PORT
=================================== */

const PORT =

  process.env.PORT ||

  3000;

/* ===================================
   START SERVER
=================================== */

app.listen(

  PORT,

  async () => {

    console.log(`

🚀 Server running on:
http://localhost:${PORT}

    `);

  }
);