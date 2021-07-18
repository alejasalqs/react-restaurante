/*
    Rutas de Users / users
    host + /api/users
*/
const express = require("express");
const {
  getAllBrandsFromRestaurant,
  updateBrand,
  deleteBrand,
  createBrand,
} = require("../controllers/brand.controller");
const { checkJWT } = require("../middlewares/jwt-validator");

const router = express.Router();

router.use(checkJWT);

router.get("/", getAllBrandsFromRestaurant);

router.post("/", createBrand);

router.put("/:id", updateBrand);

router.delete("/:id", deleteBrand);

module.exports = router;
