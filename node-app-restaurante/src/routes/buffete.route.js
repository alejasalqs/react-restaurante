/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllBuffetsFromRestaurant,
  createBuffet,
  updateBuffet,
  deleteBuffet,
} = require("../controllers/buffet.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllBuffetsFromRestaurant);

router.post("/", createBuffet);

router.put("/:codigo", updateBuffet);

router.delete("/:codigo", deleteBuffet);

module.exports = router;
