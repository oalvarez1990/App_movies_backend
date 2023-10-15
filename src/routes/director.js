const express = require('express')
const {
    getTodosDirectores,
    crearDirector,
    actualizarDirector,
    eliminarDirector,
} = require('../controllers/director.Controllers')

const directorRouter = express.Router()
//Ruta para obtener todos los directores
directorRouter.route('/').get(getTodosDirectores).post(crearDirector)
//Ruta para actualizar un director
directorRouter.route('/:id').put(actualizarDirector)
//Ruta para eliminar un director
directorRouter.route('/:id').delete(eliminarDirector)

module.exports = directorRouter
