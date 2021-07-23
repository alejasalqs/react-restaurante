/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllLicoresFromRestaurant,
  createLicores,
  updateLicores,
  deleteLicores,
} = require("../controllers/licores.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllLicoresFromRestaurant);

router.post("/", createLicores);

router.put("/:codigo", updateLicores);

router.delete("/:codigo", deleteLicores);

module.exports = router;
