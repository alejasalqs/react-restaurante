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

// Manejo de Errores
app.use((err, req, res, next) => {
  //errorLogger.log(err);
  return res.status(501).json({ success: false, message: err.message });
});

// escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servidor corriendo el el puerto ${process.env.PORT}`);
});
