const catchError = require("../utils/catchError");
const Productora = require("../models/Productora.js");

// nombre,estado,slogan,descripcion
// Función para normalizar el nombre (primera letra en mayúscula)
const normalizarNombre = (nombre) => {
  return nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
};

// Obtener todos los productores
const getTodosProductores = catchError(async (req, res) => {
  const productores = await Productora.find();
  res.json(productores);
});

// Crear un productor nuevo con la información enviada por parámetro y guardarlo en MongoDB
const crearProductor = catchError(async (req, res) => {
  const { nombre, estado, slogan, descripcion } = req.body;

  // Validar si los campos requeridos están presentes y no están vacíos
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({ message: "El nombre es obligatorio" });
  }

  // Normalizar el nombre ingresado (primera letra en mayúscula)
  const nombreNormalizado = normalizarNombre(nombre);

  // Verificar si ya existe una productora con el mismo nombre
  const productoraExistente = await Productora.findOne({
    nombre: nombreNormalizado,
  });

  if (productoraExistente) {
    return res.status(400).json({
      msg: `La productora ${nombreNormalizado} ya existe`,
    });
  }

  // Crear el productor
  const productor = await Productora.create({
    nombre: nombreNormalizado,
    estado,
    slogan,
    descripcion,
  });

  res.json(productor);
});

// Actualizar un productor por su ID
const actualizarProductor = catchError(async (req, res) => {
  const { id } = req.params;
  const { nombre, estado, slogan, descripcion } = req.body;

  // Validar si el campo "nombre" está vacío
  if (!nombre || typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(400).json({ message: "El nombre es obligatorio" });
  }

  // Normalizar el nombre ingresado (primera letra en mayúscula)
  const nombreNormalizado = normalizarNombre(nombre);

  // Actualizar el productor por su ID
  const productorActualizado = await Productora.findByIdAndUpdate(
    id,
    {
      nombre: nombreNormalizado,
      estado,
      slogan,
      descripcion,
    },
    { new: true }
  );

  if (!productorActualizado) {
    return res.status(404).json({
      msg: `El productor con ID ${id} no existe`,
    });
  }

  res.json(productorActualizado);
});

// Eliminar un productor por su ID
const eliminarProductor = catchError(async (req, res) => {
  const { id } = req.params;

  // Verificar si el productor existe por su ID y eliminarlo
  const productorEliminado = await Productora.findByIdAndRemove(id);

  if (!productorEliminado) {
    return res.status(404).json({
      msg: `El productor con ID ${id} no existe`,
    });
  }

  res.json({
    msg: `Productor con ID ${id} eliminado con éxito`,
    productorEliminado,
  });
});

module.exports = {
  getTodosProductores,
  crearProductor,
  actualizarProductor,
  eliminarProductor,
};
