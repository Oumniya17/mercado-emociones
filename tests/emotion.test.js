const chai =
  require("chai");

const expect =
  chai.expect;

const Emotion =
  require("../backend/models/Emotion");

/* ===================================
   EMOTION MODEL TESTS
=================================== */

describe(

  "Emotion Model",

  () => {

    /* ===============================
       POSITIVE
    =============================== */

    it(

      "should create valid emotion",

      () => {

        const emotion =
          new Emotion({

            nombre: "Fear",

            descripcion:
              "Market fear",

            precioBase: 500
          });

        expect(
          emotion.nombre
        ).to.equal(
          "Fear"
        );
      }
    );

    it(

      "should have base price",

      () => {

        const emotion =
          new Emotion({

            nombre: "Fear",

            descripcion:
              "Market fear",

            precioBase: 500
          });

        expect(
          emotion.precioBase
        ).to.equal(
          500
        );
      }
    );

    it(

      "should support description",

      () => {

        const emotion =
          new Emotion({

            nombre: "Fear",

            descripcion:
              "Volatile emotion",

            precioBase: 300
          });

        expect(
          emotion.descripcion
        ).to.equal(
          "Volatile emotion"
        );
      }
    );

    /* ===============================
       NEGATIVE
    =============================== */

    it(

      "should fail without nombre",

      () => {

        const emotion =
          new Emotion({

            descripcion:
              "Fear emotion",

            precioBase: 500
          });

        const error =
          emotion.validateSync();

        expect(
          error.errors.nombre
        ).to.exist;
      }
    );

    it(

      "should fail without precioBase",

      () => {

        const emotion =
          new Emotion({

            nombre: "Fear",

            descripcion:
              "Fear emotion"
          });

        const error =
          emotion.validateSync();

        expect(
          error.errors.precioBase
        ).to.exist;
      }
    );

    it(

      "should fail with negative price",

      () => {

        const emotion =
          new Emotion({

            nombre: "Fear",

            descripcion:
              "Fear emotion",

            precioBase: -100
          });

        const error =
          emotion.validateSync();

        expect(
          error.errors.precioBase
        ).to.exist;
      }
    );
  }
);