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
      useDefaults: false,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "example.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  }),
);
// app.use(helmet());

app.use(cors());
//
app.use("/api/v1", router);

app.use(errorHandler);

module.exports = app;
