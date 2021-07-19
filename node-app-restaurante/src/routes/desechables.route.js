/*
    Rutas de Comestibles / comestibles
    host + /api/products/comestibles
*/
const express = require("express");
const {
  getAllDesechablesFromRestaurant,
  createDesechables,
  updateDesechables,
  deleteDesechables,
} = require("../controllers/desechables.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllDesechablesFromRestaurant);

router.post("/", createDesechables);

router.put("/:id", updateDesechables);

router.delete("/:id", deleteDesechables);

module.exports = router;
