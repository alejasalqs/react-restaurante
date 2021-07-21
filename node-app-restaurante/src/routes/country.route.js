/*
    Rutas de Users / users
    host + /api/users
*/
const express = require("express");

const {
  getAllCountries,
  createCountry,
  updateCountry,
  deleteCountry,
} = require("../controllers/country.controller");
const { checkJWT } = require("../middlewares/jwt-validator");

const router = express.Router();

router.use(checkJWT);

router.get("/", getAllCountries);

router.post("/", createCountry);

router.put("/:codigo", updateCountry);

router.delete("/:codigo", deleteCountry);

module.exports = router;
