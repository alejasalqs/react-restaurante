/*
    Rutas de Users / users
    host + /api/users
*/
const express = require("express");
const {
  getConsecutivos,
  createConsecuivo,
  updateConsecutivo,
  deleteConsecutivo,
  generateNewConsecutivo,
} = require("../controllers/consecutivos.controller");

const { checkJWT } = require("../middlewares/jwt-validator");

const router = express.Router();

//router.use(checkJWT);

router.get("/", getConsecutivos);

router.get("/:tipo", generateNewConsecutivo);

router.post("/", createConsecuivo);

router.put("/:id", updateConsecutivo);

router.delete("/:id", deleteConsecutivo);

module.exports = router;
