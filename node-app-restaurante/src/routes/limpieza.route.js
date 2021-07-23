/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllProductosLimpiezaFromRestaurant,
  createProductosLimpieza,
  updateProductosLimpieza,
  deleteProductosLimpieza,
} = require("../controllers/limpieza.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllProductosLimpiezaFromRestaurant);

router.post("/", createProductosLimpieza);

router.put("/:codigo", updateProductosLimpieza);

router.delete("/:codigo", deleteProductosLimpieza);

module.exports = router;
