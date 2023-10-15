const mongoose = require("mongoose");

const peliculaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, "El campo es obligatorio"],
    maxLength: 50,
  },
  sinopsis: {
    type: String,
    required: [true, "El campo es obligatorio"],
    maxLength: 200,
  },
  url: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  imagen: {
    type: String,
    required: [true, "El campo es obligatorio"],
  },
  fechaCreacion: {
    type: Date,
    default: Date.now,
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now,
  },
  anioEstreno: {
    type: Number,
    required: [true, "El campo es obligatorio"],
  },
  genero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genero",
    required: true,
  },
  director: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Director",
    required: true,
  },
  productora: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Productora",
    required: true,
  },
  tipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tipo",
    required: true,
  },
});

const Pelicula = mongoose.model("Pelicula", peliculaSchema);

module.exports = Pelicula;
