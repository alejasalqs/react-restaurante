/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllBebidaCalienteFromRestaurant,
  createBebidaCaliente,
  updateBebidaCaliente,
  deleteBebidaCaliente,
} = require("../controllers/bebida-caliente.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllBebidaCalienteFromRestaurant);

router.post("/", createBebidaCaliente);

router.put("/:codigo", updateBebidaCaliente);

router.delete("/:codigo", deleteBebidaCaliente);

module.exports = router;
