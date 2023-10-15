const mongoose = require("mongoose");

const directorSchema = new mongoose.Schema({
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
});

const Director = mongoose.model("Director", directorSchema);

module.exports = Director;
