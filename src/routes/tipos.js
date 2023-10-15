const express = require("express");

const {
  getTodosTipos,
  crearTipo,
  actualizarTipo,
} = require("../controllers/tipo.Controllers");


const tipoRouter = express.Router();

tipoRouter.route("/").get(getTodosTipos).post(crearTipo).put(actualizarTipo);


module.exports = tipoRouter;
