/*
    Rutas de Table / tables
    host + /api/tables
*/
const express = require("express");
const {
  getAllTablesFromRestaurant,
  createTable,
  updateTable,
  deleteTable,
} = require("../controllers/table.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllTablesFromRestaurant);

router.post("/", createTable);

router.put("/:id", updateTable);

router.delete("/:id", deleteTable);

module.exports = router;
