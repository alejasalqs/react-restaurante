/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllVinosFromRestaurant,
  createVinos,
  updateVinos,
  deleteVinos,
} = require("../controllers/vinos.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllVinosFromRestaurant);

router.post("/", createVinos);

router.put("/:codigo", updateVinos);

router.delete("/:codigo", deleteVinos);

module.exports = router;
