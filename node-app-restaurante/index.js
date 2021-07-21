const express = require("express"); // Importacion de express
require("dotenv").config(); // Variables de entorno
const cors = require("cors");
const { dbConnection } = require("./src/database/config");

// Crear servidor de express
const app = express();

// Conecatar al DB
dbConnection();

// CORS
app.use(cors());

// Directorio publico
app.use(express.static("public"));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use("/api/auth", require("./src/routes/Auth.route"));
app.use("/api/database", require("./src/routes/DataBase.route"));
app.use("/api/restaurant", require("./src/routes/Restaurant.route"));
app.use("/api/users", require("./src/routes/Users.route"));
app.use("/api/employees", require("./src/routes/employees.route"));
app.use("/api/tables", require("./src/routes/table.route"));
app.use("/api/positions", require("./src/routes/position.route"));
app.use("/api/brands", require("./src/routes/brand.route"));
app.use("/api/suppliers", require("./src/routes/supplier.route"));
app.use("/api/consecutivos", require("./src/routes/consecutivos.route"));
app.use("/api/clients", require("./src/routes/clients.route"));
app.use("/api/rols", require("./src/routes/rol.route"));
app.use("/api/countries", require("./src/routes/country.route"));
app.use("/api/unidades-medida", require("./src/routes/unidad-medida.route"));
app.use("/api/products/comestibles", require("./src/routes/comestibles.route"));
app.use("/api/products/desechables", require("./src/routes/desechables.route"));
app.use("/api/products/limpieza", require("./src/routes/limpieza.route"));
app.use("/api/products/tecnologia", require("./src/routes/tecnologia.route"));
app.use("/api/products/equipos", require("./src/routes/equipos.route"));

// Manejo de Errores
app.use((err, req, res, next) => {
  let log = {
    Mensaje: err.message ? err.message.substr(0, 500) : "Error desconocido",
    Descripcion: err.stack ? err.stack.substr(0, 500) : "",
    Codigo_Error: err.code || -1,
    Fecha: new Date(),
  };
  return res.status(500).json({ ok: false, mensaje: err.message, log });
});

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo el el puerto ${process.env.PORT}`);
});
