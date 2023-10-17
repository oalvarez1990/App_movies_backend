const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
require("dotenv").config();
const router = require("./routes");
const errorHandler = require("./utils/errorHandler");

// Esta es nuestra aplicación
const app = express();
//
app.use(function (req, res, next) {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self'; frame-src 'self'"
  );
  next();
});

// Middlewares
app.use(express.json());
// app.use(
//   helmet({
//     crossOriginResourcePolicy: false,
//   })
// );
app.use(helmet());

app.use(cors());
//
app.use("/api/v1", router);

app.use(errorHandler);

module.exports = app;
