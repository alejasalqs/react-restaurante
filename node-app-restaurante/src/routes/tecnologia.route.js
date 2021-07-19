/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllProductosTecnologiaFromRestaurant,
  createProductosTecnologia,
  updateProductosTecnologia,
  deleteProductosTecnologia,
} = require("../controllers/tecnologia.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllProductosTecnologiaFromRestaurant);

router.post("/", createProductosTecnologia);

router.put("/:id", updateProductosTecnologia);

router.delete("/:id", deleteProductosTecnologia);

module.exports = router;
