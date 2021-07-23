/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllEspecialesFromRestaurant,
  createEspeciales,
  updateEspeciles,
  deleteEspeciales,
} = require("../controllers/especiales.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllEspecialesFromRestaurant);

router.post("/", createEspeciales);

//router.put("/:codigo", updateEspeciles);

router.delete("/:codigo", deleteEspeciales);

module.exports = router;
