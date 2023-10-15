const mongoose = require("mongoose");

const tipoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El campo es obligatorio"],
    maxLength: 50,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
  // descripcion
  descripcion: {
    type: String,
    required: [true, "El campo es obligatorio"],
    maxLength: 200,
  },
});

const Tipo = mongoose.model("Tipo", tipoSchema);

module.exports = Tipo;
