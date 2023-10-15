const mongoose = require("mongoose");

const productoraSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El campo es obligatorio"],
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
  slogan: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  descripcion: {
    type: String,
    required: [true, "El campo es obligatorio"],
    maxLength: 200,
  },
});

const Productora = mongoose.model("Productora", productoraSchema);

module.exports = Productora;
