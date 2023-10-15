// createCollections.js

const mongoose = require("mongoose");
const Tipo = require("./src/models/Tipo"); // Importa el modelo Tipo
const Genero = require("./src/models/Genero"); // Importa el modelo Genero
const Pelicula = require("./src/models/Pelicula"); // Importa el modelo Pelicula
const Productora = require("./src/models/Productora"); // Importa el modelo Productora
const Director = require("./src/models/Director"); // Importa el modelo Director

async function createCollections() {
  try {
    await mongoose.connection.dropDatabase(); // Elimina la base de datos existente (ten cuidado con esto en un entorno de producción)

    await Tipo.createCollection();
    await Genero.createCollection();
    await Pelicula.createCollection();
    await Productora.createCollection();
    await Director.createCollection();

    console.log("Colecciones creadas exitosamente");
  } catch (err) {
    console.error("Error al crear colecciones:", err);
  } finally {
    mongoose.connection.close();
  }
}

createCollections();
