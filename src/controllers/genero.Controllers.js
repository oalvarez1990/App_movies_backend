const catchError = require("../utils/catchError");
const Genero = require("../models/Genero");

// Función para normalizar el nombre (primera letra en mayúscula)
const normalizarNombre = (nombre) => {
  return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
};

// Obtener todos los géneros
const getTodosGeneros = catchError(async (req, res) => {
  const generos = await Genero.find();
  res.json(generos);
});

// Obtener los géneros por id
const getIdGenero = async (id) => {
  // validar si existe id
  // Validar si existe el ID
  if (!id) {
    throw new Error("El ID es obligatorio");
  }

  const genero = await Genero.findById(id);
  return genero;
}

// Crear un género
const crearGenero = catchError(async (req, res) => {
  const { nombre, descripcion } = req.body;

  // Validar si el campo "nombre" está vacío
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res
      .status(400)
      .json({ message: "Nombre o descripción son obligatorios" });
  }

  // Normalizar el nombre ingresado (primera letra en mayúscula)
  const nombreNormalizado = normalizarNombre(nombre);

  // Validar si ya existe un género con el mismo nombre normalizado
  const generoExistente = await Genero.findOne({ nombre: nombreNormalizado });

  if (generoExistente) {
    return res.status(400).json({
      msg: `El género ${nombreNormalizado} ya existe`,
    });
  }

  // Crear género
  const nuevoGenero = new Genero({ nombre: nombreNormalizado, descripcion });
  await nuevoGenero.save();

  res.status(201).json({
    msg: `Género ${nombreNormalizado} creado con éxito`,
    nuevoGenero,
  });
});

// Actualizar un género

const actualizarGenero = catchError(async (req, res) => {
  const { id, nombreActualizar } = req.params;
  const { nombre, descripcion, estado } = req.body;

  // Validar si el campo "nombre" está vacío
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res
      .status(400)
      .json({ message: "Nombre o descripción son obligatorios" });
  }

  // Inicializar un objeto con las propiedades que se actualizarán
  const updateFields = {};

  // Normalizar el nombre si se proporciona
  if (nombre) {
    const nombreNormalizado = normalizarNombre(nombre);
    updateFields.nombre = nombreNormalizado;
  }

  // Agregar descripción si se proporciona
  if (descripcion) {
    updateFields.descripcion = descripcion;
  }

  // Agregar estado si se proporciona
  if (estado) {
    updateFields.estado = estado;
  }

  let generoActualizado;

  if (id) {
    // Si se proporciona un ID, actualizar por ID
    generoActualizado = await Genero.findByIdAndUpdate(id, updateFields, {
      new: true,
    });
  } else if (nombreActualizar) {
    // Si se proporciona un nombre, actualizar por nombre
    generoActualizado = await Genero.findOneAndUpdate(
      { nombre: nombreActualizar },
      updateFields,
      { new: true }
    );
  }

  if (!generoActualizado) {
    return res.status(404).json({
      msg: `El género ${
        id ? "con ID " + id : "con nombre " + nombreActualizar
      } no existe`,
    });
  }

  res.json({
    msg: `Género ${generoActualizado.nombre} actualizado con éxito`,
    generoActualizado,
  });
});

// eliminar un género
const eliminarGenero = catchError(async (req, res) => {
  const { id } = req.params;

  const generoEliminado = await Genero.findByIdAndDelete(id);

  if (!generoEliminado) {
    return res.status(404).json({
      msg: `El género con ID ${id} no existe`,
    });
  }

  res.json({
    msg: `Género ${generoEliminado.nombre} eliminado con éxito`,
    generoEliminado,
  });
});

module.exports = {
  getTodosGeneros,
  crearGenero,
  actualizarGenero,
  eliminarGenero,
  getIdGenero
};
