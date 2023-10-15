const express = require('express')
const {
    getTodosProductores,
    crearProductor,
    actualizarProductor,
    eliminarProductor,
} = require('../controllers/productora.Controllers')


const productoraRouter = express.Router()

//Ruta para obtener todos los productores
productoraRouter.route('/').get(getTodosProductores)

//Ruta para crear un productor
productoraRouter.route('').post(crearProductor)
//Ruta para actualizar la informacion de un productor
productoraRouter.route('/:id').put(actualizarProductor)
//Ruta para eliminar un productor
productoraRouter.route('/eliminar/:id').delete(eliminarProductor)



module.exports= productoraRouter