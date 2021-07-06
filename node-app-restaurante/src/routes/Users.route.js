/*
    Rutas de Users / users
    host + /api/users
*/
const express = require("express");
const {
  getAllUsersFromRestaurant,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/Users.controller");
const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllUsersFromRestaurant);

router.post("/", createUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
