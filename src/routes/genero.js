const express = require('express')

const {
    getTodosGeneros,
    getIdGenero,
    crearGenero,
    actualizarGenero,
    eliminarGenero
} = require('../controllers/genero.Controllers')


const generoRouter = express.Router()

generoRouter.route('/').get(getTodosGeneros).post(crearGenero)
// Obtener los géneros por id
generoRouter.route('/:id').get(getIdGenero);
// Actualizar un género por su ID
generoRouter.route('/:id').put(actualizarGenero);

// Actualizar un género por su nombre
generoRouter.route('/nombre/:nombreActualizar').put(actualizarGenero);

// Eliminar un género por su ID
generoRouter.route('/:id').delete(eliminarGenero);


module.exports = generoRouter

