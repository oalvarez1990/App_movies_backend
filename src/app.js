const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes");
const errorHandler = require("./utils/errorHandler");

// Esta es nuestra aplicación
const app = express();
//

// Middlewares
app.use(express.json());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"], // Permite la carga desde el mismo dominio
        fontSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "data:",
          // "https://appmoviesbackend-production.up.railway.app/",
          "https://appmoviesbackend-production.up.railway.app/api/v1",
        ], // Permite la carga de fuentes web desde tu dominio y el dominio de la fuente web
        contentSecurityPolicy: false,
        xDownloadOptions: false,
      },
    },
  })
);

// app.use(helmet());
// https://github.com/helmetjs/helmet/blob/main/README.md
app.use(cors());
//
app.use("/api/v1", router);

app.use(errorHandler);

module.exports = app;
