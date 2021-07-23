/*
    Rutas de Rols / rols
    host + /api/rols
*/
const express = require("express");

const {
  getAllRolsFromRestaurant,
  createRol,
  updateRol,
  deleteRol,
} = require("../controllers/rol.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllRolsFromRestaurant);

router.post("/", createRol);

router.put("/:codigo", updateRol);

router.delete("/:codigo", deleteRol);

module.exports = router;
