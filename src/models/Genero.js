const mongoose = require("mongoose");

const generoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El campo nombre es obligatorio"],
    maxLength: 50,
  },
  estado: {
    type: Boolean,
    default: true,
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
  descripcion: {
    type: String,
    required: [true, "El campo descripcion es obligatorio"],
  },
});

const Genero = mongoose.model("Genero", generoSchema);

module.exports = Genero;
