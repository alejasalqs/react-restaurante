/*
    Rutas de Table / tables
    host + /api/tables
*/
const express = require("express");
const {
  getAllSuppliersFromRestaurant,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplier.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllSuppliersFromRestaurant);

router.post("/", createSupplier);

router.put("/:id", updateSupplier);

router.delete("/:id", deleteSupplier);

module.exports = router;
