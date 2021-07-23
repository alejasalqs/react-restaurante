/*
    Rutas de Employees / employees
    host + /api/employees
*/
const express = require("express");
const {
  getAllClientsFromRestaurant,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/clients.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllClientsFromRestaurant);

router.post("/", createClient);

router.put("/:codigo", updateClient);

router.delete("/:codigo", deleteClient);

module.exports = router;
