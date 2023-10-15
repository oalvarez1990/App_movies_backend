const catchError = require("../utils/catchError");
const Tipo = require("../models/Tipo");

// Función para normalizar el nombre (primera letra en mayúscula)
const normalizarNombre = (nombre) => {
  return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
};

// Obtener todos los tipos
const getTodosTipos = catchError(async (req, res) => {
  const tipos = await Tipo.find();
  res.json(tipos);
});

// Crear un nuevo tipo
const crearTipo = catchError(async (req, res) => {
  const { nombre, descripcion } = req.body;

  // Validar si el campo "nombre" está vacío
  if (!nombre || !descripcion) {
    return res
      .status(400)
      .json({ message: "Nombre y descripción son obligatorios" });
  }

  // Normalizar el nombre ingresado (primera letra en mayúscula)
  const nombreNormalizado = normalizarNombre(nombre);

  // Validar si ya existe un tipo con el mismo nombre normalizado
  const tipoExistente = await Tipo.findOne({ nombre: nombreNormalizado });

  if (tipoExistente) {
    return res.status(400).json({
      msg: `El tipo ${nombreNormalizado} ya existe`,
    });
  }

  // Crear tipo
  const nuevoTipo = new Tipo({ nombre: nombreNormalizado, descripcion });
  await nuevoTipo.save();

  res.status(201).json({
    msg: `Tipo ${nombreNormalizado} creado con éxito`,
    nuevoTipo,
  });
});

// Actualizar un tipo
const actualizarTipo = catchError(async (req, res) => {
  const { nombre, descripcion } = req.body;

  // Validar si el campo "nombre" está vacío
  if (!nombre) {
    return res.status(400).json({
      msg: "El nombre es obligatorio",
    });
  }

  // Normalizar el nombre ingresado (primera letra en mayúscula)
  const nombreNormalizado = nombre.charAt(0).toUpperCase() + nombre.slice(1);

  // Validar si ya existe un tipo con el mismo nombre normalizado
  const tipoExistente = await Tipo.findOne({ nombre: nombreNormalizado });

  if (tipoExistente) {
    return res.status(400).json({
      msg: `El tipo ${nombreNormalizado} ya existe`,
    });
  }

  // Buscar el tipo a actualizar
  const tipo = await Tipo.findById(req.params.id);

  // Si el tipo existe, actualizarlo
  if (tipo) {
    tipo.nombre = nombreNormalizado;
    tipo.descripcion = descripcion;

    const tipoActualizado = await tipo.save();

    res.json({
      msg: `Tipo ${nombreNormalizado} actualizado con éxito`,
      tipoActualizado,
    });
  } else {
    res.status(404).json({
      msg: "Tipo no encontrado",
    });
  }
});

// metodo eliminar tipo
// metodo obtener un tipo

module.exports = {
  getTodosTipos,
  crearTipo,
  actualizarTipo,
};
