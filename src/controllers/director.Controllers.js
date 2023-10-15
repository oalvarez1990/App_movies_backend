const catchError = require("../utils/catchError");
const Director = require("../models/Director");

// Función para normalizar el nombre (primera letra en mayúscula)
const normalizarNombre = (nombre) => {
  return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
};

// Obtener todos los directores
const getTodosDirectores = catchError(async (req, res) => {
  const directores = await Director.find();
  res.json(directores);
});

// Crear un director nuevo con la información enviada por parámetro y guardarlo a MongoDB
const crearDirector = catchError(async (req, res) => {
  const { nombre, estado } = req.body;

  // Validar si el campo "nombre" está vacío
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res
      .status(400)
      .json({ message: "Nombre o apellido son obligatorios" });
  }

  // Normalizar el nombre ingresado (primera letra en mayúscula)
  const nombreNormalizado = normalizarNombre(nombre);

  // Validar si ya existe un director con el mismo nombre normalizado
  const directorExistente = await Director.findOne({
    nombre: nombreNormalizado,
  });

  if (directorExistente) {
    return res.status(400).json({
      msg: `El director ${nombreNormalizado} ya existe`,
    });
  }

  // Crear director
  const director = await Director.create({
    nombre: nombreNormalizado,
    estado,
  });
  console.log("Creando", director._id);
  res.json(director);
});

// Actualizar un director
const actualizarDirector = catchError(async (req, res) => {
  const { id } = req.params;
  const { nombre, estado } = req.body;

  // Validar si el campo "nombre" está vacío
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res
      .status(400)
      .json({ message: "Nombre o apellido son obligatorios" });
  }

  // Normalizar el nombre ingresado (primera letra en mayúscula)
  const nombreNormalizado = normalizarNombre(nombre);

  // Validar si ya existe un director con el mismo nombre normalizado
  const directorExistente = await Director.findOne({
    nombre: nombreNormalizado,
  });

  if (directorExistente) {
    return res.status(400).json({
      msg: `El director ${nombreNormalizado} ya existe`,
    });
  }

  // Actualizar director
  const director = await Director.findByIdAndUpdate(
    id,
    {
      nombre: nombreNormalizado,
      estado,
    },
    { new: true }
  );

  res.json(director);
});

// Eliminar un género
const eliminarDirector = catchError(async (req, res) => {
  const { id } = req.params;

  // Validar si existe un director con el id enviado por parámetro
  const directorExistente = await Director.findById(id);

  if (!directorExistente) {
    return res.status(400).json({
      msg: `El director con el id ${id} no existe`,
    });
  }

  // Eliminar director
  await Director.findByIdAndDelete(id);

  res.json({
    msg: `El director con el id ${id} ha sido eliminado`,
  });
});

module.exports = {
  getTodosDirectores,
  crearDirector,
  actualizarDirector,
    eliminarDirector,
};
