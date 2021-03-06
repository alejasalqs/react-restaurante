/*
    Rutas de Position / positions
    host + /api/positions
*/
const express = require("express");
const {
  getAllPositions,
  createPosition,
  updatePosition,
  deletePosition,
} = require("../controllers/position.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllPositions);

router.post("/", createPosition);

router.put("/:codigo", updatePosition);

router.delete("/:codigo", deletePosition);

module.exports = router;
