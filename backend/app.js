const express =
  require("express");

const cors =
  require("cors");

const morgan =
  require("morgan");

const path =
  require("path");

const swaggerUi =
  require("swagger-ui-express");

const YAML =
  require("yamljs");

const connectDB =
  require("./config/db");

const swaggerDocument =
  YAML.load(

    "./backend/docs/swagger.yaml"
  );

/* ===================================
   EXPRESS APP
=================================== */

const app =
  express();

/* ===================================
   DATABASE
=================================== */

connectDB();

/* ===================================
   MIDDLEWARE
=================================== */

app.use(
  cors()
);

app.use(
  express.json()
);

app.use(
  express.urlencoded({

    extended: true
  })
);

app.use(
  morgan("dev")
);

/* ===================================
   STATIC FRONTEND
=================================== */

app.use(

  express.static(

    path.join(

      __dirname,

      "../public"
    )
  )
);

/* ===================================
   SWAGGER DOCS
=================================== */

app.use(

  "/api-docs",

  swaggerUi.serve,

  swaggerUi.setup(
    swaggerDocument
  )
);

/* ===================================
   API ROUTES
=================================== */

app.use(

  "/api/auth",

  require("./routes/auth.routes")
);

app.use(

  "/api/users",

  require("./routes/users.routes")
);

app.use(

  "/api/emotions",

  require("./routes/emotions.routes")
);

app.use(

  "/api/transactions",

  require("./routes/transactions.routes")
);

app.use(

  "/api/analytics",

  require("./routes/analytics.routes")
);

/* ===================================
   HEALTH CHECK
=================================== */

app.get(
  "/api",
  (req, res) => {

    res.json({

      success: true,

      message:
        "Emotional Black Market API Running"
    });
  }
);

/* ===================================
   FRONTEND FALLBACK
=================================== */

app.use(
  (req, res) => {

    res.sendFile(

      path.join(

        __dirname,

        "../public/index.html"
      )
    );
  }
);

/* ===================================
   ERROR HANDLER
=================================== */

const errorHandler =
  require(
    "./middleware/error.middleware"
  );

app.use(
  errorHandler
);

/* ===================================
   EXPORT
=================================== */

module.exports =
  app;