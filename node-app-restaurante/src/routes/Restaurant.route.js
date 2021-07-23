/*
    Rutas de Restaurant / restaurant
    host + /api/restaurant
*/

const express = require("express");
const router = express.Router();
const {
  getAllRestaurantsByDB,
  getRestaurantByID,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/Restaurant.controller");

router.get("/", getAllRestaurantsByDB);

router.get("/:id", getRestaurantByID);

router.post("/", createRestaurant);

router.put("/:codigo", updateRestaurant);

router.delete("/:codigo", deleteRestaurant);

module.exports = router;
