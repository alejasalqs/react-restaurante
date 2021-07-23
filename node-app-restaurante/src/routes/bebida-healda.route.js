/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllBebidaHeladaFromRestaurant,
  createBebidaHelada,
  updateBebidaHelada,
  deleteBebidaHelada,
} = require("../controllers/bebida-helada.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllBebidaHeladaFromRestaurant);

router.post("/", createBebidaHelada);

router.put("/:codigo", updateBebidaHelada);

router.delete("/:codigo", deleteBebidaHelada);

module.exports = router;
