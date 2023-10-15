const express = require('express');
const router = express.Router();

const tiposRoutes = require('./tipos')
const generoRouter =require('./genero')
const directorRouter = require('./director')
const productoraRouter = require('./productora')
const peliculaRouter=require('./pelicula')



// colocar las rutas aquí
router.use('/tipos', tiposRoutes);
router.use('/genero', generoRouter);
router.use('/director', directorRouter);
router.use('/productora', productoraRouter);
router.use('/pelicula', peliculaRouter);



module.exports = router;