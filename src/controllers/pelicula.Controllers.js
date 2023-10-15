const catchError = require("../utils/catchError");
const Pelicula = require("../models/Peliculas");

// Obtener todas las películas
const getTodasPeliculas = catchError(async (req, res) => {
  const peliculas = await Pelicula.find()
    .populate("genero") // Popula la referencia al modelo Genero
    .populate("director") // Popula la referencia al modelo Director
    .populate("productora") // Popula la referencia al modelo Productora
    .populate("tipo"); // Popula la referencia al modelo Tipo
  res.json(peliculas);
});

// Crear una película
const crearPelicula = catchError(async (req, res) => {
  const {
    titulo,
    sinopsis,
    url,
    imagen,
    anioEstreno,
    genero,
    director,
    productora,
    tipo,
  } = req.body;

  // Validar si los campos requeridos están presentes y no están vacíos
  if (
    !titulo ||
    !sinopsis ||
    !url ||
    !imagen ||
    !anioEstreno ||
    !genero ||
    !director ||
    !productora ||
    !tipo
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  // Crear la película
  const pelicula = await Pelicula.create({
    titulo,
    sinopsis,
    url,
    imagen,
    anioEstreno,
    genero,
    director,
    productora,
    tipo,
  });

  res.json(pelicula);
});

// Actualizar una película por su ID
const actualizarPelicula = catchError(async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    sinopsis,
    url,
    imagen,
    anioEstreno,
    genero,
    director,
    productora,
    tipo,
  } = req.body;

  // Validar si los campos requeridos están presentes y no están vacíos
  if (
    !titulo ||
    !sinopsis ||
    !url ||
    !imagen ||
    !anioEstreno ||
    !genero ||
    !director ||
    !productora ||
    !tipo
  ) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  // Actualizar la película por su ID
  const peliculaActualizada = await Pelicula.findByIdAndUpdate(
    id,
    {
      titulo,
      sinopsis,
      url,
      imagen,
      anioEstreno,
      genero,
      director,
      productora,
      tipo,
    },
    { new: true }
  );

  if (!peliculaActualizada) {
    return res.status(404).json({
      msg: `La película con ID ${id} no existe`,
    });
  }

  res.json(peliculaActualizada);
});

// Eliminar una película por su ID
const eliminarPelicula = catchError(async (req, res) => {
  const { id } = req.params;

  // Verificar si la película existe por su ID y eliminarla
  const peliculaEliminada = await Pelicula.findByIdAndRemove(id);

  if (!peliculaEliminada) {
    return res.status(404).json({
      msg: `La película con ID ${id} no existe`,
    });
  }

  res.json({
    msg: `Película con ID ${id} eliminada con éxito`,
    peliculaEliminada,
  });
});

module.exports = {
  getTodasPeliculas,
  crearPelicula,
  actualizarPelicula,
  eliminarPelicula,
};
