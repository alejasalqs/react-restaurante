/*
    Rutas de DataBase / database
    host + /api/database
*/

const express = require("express");
const router = express.Router();
const {
  getAllDataBases,
  getDataBaseByID,
  createNewDataBase,
  updateDataBase,
  deleteDataBase,
} = require("../controllers/DataBase.controller");

router.get("/", getAllDataBases);

router.get("/:id", getDataBaseByID);

router.post("/", createNewDataBase);

router.put("/:id", updateDataBase);

router.delete("/:id", deleteDataBase);

module.exports = router;
