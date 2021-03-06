/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllComestiblesFromRestaurant,
  createComestible,
  updateComestible,
  deleteComestible,
} = require("../controllers/comestibles.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllComestiblesFromRestaurant);

router.post("/", createComestible);

router.put("/:codigo", updateComestible);

router.delete("/:codigo", deleteComestible);

module.exports = router;
