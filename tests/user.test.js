const chai =
  require("chai");

const expect =
  chai.expect;

const User =
  require("../backend/models/User");

/* ===================================
   USER MODEL TESTS
=================================== */

describe(

  "User Model",

  () => {

    /* ===============================
       POSITIVE
    =============================== */

    it(

      "should create valid user",

      async () => {

        const user =
          new User({

            nombre: "Neo",

            email: "neo@test.com",

            password: "123456"
          });

        expect(
          user.nombre
        ).to.equal(
          "Neo"
        );
      }
    );

    it(

      "should have default role",

      async () => {

        const user =
          new User({

            nombre: "Neo",

            email: "neo@test.com",

            password: "123456"
          });

        expect(
          user.rol
        ).to.equal(
          "user"
        );
      }
    );

    it(

      "should have emotional balance",

      async () => {

        const user =
          new User({

            nombre: "Neo",

            email: "neo@test.com",

            password: "123456"
          });

        expect(
          user.saldoEmocional
        ).to.equal(
          1000
        );
      }
    );

    /* ===============================
       NEGATIVE
    =============================== */

    it(

      "should fail without nombre",

      () => {

        const user =
          new User({

            email: "neo@test.com",

            password: "123456"
          });

        const error =
          user.validateSync();

        expect(
          error.errors.nombre
        ).to.exist;
      }
    );

    it(

      "should fail without email",

      () => {

        const user =
          new User({

            nombre: "Neo",

            password: "123456"
          });

        const error =
          user.validateSync();

        expect(
          error.errors.email
        ).to.exist;
      }
    );

    it(

      "should fail without password",

      () => {

        const user =
          new User({

            nombre: "Neo",

            email: "neo@test.com"
          });

        const error =
          user.validateSync();

        expect(
          error.errors.password
        ).to.exist;
      }
    );
  }
);