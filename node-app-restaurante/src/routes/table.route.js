/*
    Rutas de Table / tables
    host + /api/tables
*/
const express = require("express");
const {
  getAllTablesFromRestaurant,
  getTableByIDRestaurant,
  createTable,
  updateTable,
  deleteTable,
} = require("../controllers/table.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllTablesFromRestaurant);

router.get("/:id", getTableByIDRestaurant);

router.post("/", createTable);

router.put("/:codigo", updateTable);

router.delete("/:codigo", deleteTable);

module.exports = router;
