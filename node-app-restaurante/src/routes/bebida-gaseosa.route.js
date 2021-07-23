/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllBebidaGaseosaFromRestaurant,
  createBebidaGaseosa,
  updateBebidaGaseosa,
  deleteBebidaGaseosa,
} = require("../controllers/bebida-gaseosa.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllBebidaGaseosaFromRestaurant);

router.post("/", createBebidaGaseosa);

router.put("/:codigo", updateBebidaGaseosa);

router.delete("/:codigo", deleteBebidaGaseosa);

module.exports = router;
