const express = require('express')

const {
    getTodasPeliculas,
    crearPelicula,
    actualizarPelicula,
    eliminarPelicula,
} = require('../controllers/pelicula.Controllers')

const peliculaRouter = express.Router()
//Ruta para obtener todas las Películas
peliculaRouter.route('/').get(getTodasPeliculas)
// Crear una película
peliculaRouter.route('/').post(crearPelicula);
// Actualizar una película por su ID
peliculaRouter.route('/:id').put(actualizarPelicula);
// Eliminar una película por su ID
peliculaRouter.route('/:id').delete(eliminarPelicula);

module.exports = peliculaRouter;