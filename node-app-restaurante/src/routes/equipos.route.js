/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllEquiposUtensiliosFromRestaurant,
  createEquiposUtencilios,
  updateEquiposUtencilios,
  deleteEquiposUtencilios,
} = require("../controllers/equipos.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllEquiposUtensiliosFromRestaurant);

router.post("/", createEquiposUtencilios);

router.put("/:id", updateEquiposUtencilios);

router.delete("/:id", deleteEquiposUtencilios);

module.exports = router;
