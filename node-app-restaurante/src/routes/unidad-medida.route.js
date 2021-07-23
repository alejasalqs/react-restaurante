/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllUnidadMedida,
  createUnidadMedida,
  updateUnidadMedida,
  deleteUnidadMedida,
} = require("../controllers/unidad-medida.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllUnidadMedida);

router.post("/", createUnidadMedida);

router.put("/:codigo", updateUnidadMedida);

router.delete("/:codigo", deleteUnidadMedida);

module.exports = router;
