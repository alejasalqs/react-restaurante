const express = require("express"); // Importacion de express
require("dotenv").config(); // Variables de entorno

// Crear servidor de express
const app = express();

// Directorio publico
app.use(express.static("public"));

// Rutas

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo el el puerto ${process.env.PORT}`);
});
