/*
    Rutas de Employees / employees
    host + /api/employees
*/
const express = require("express");
const {
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getAllEmployeesFromRestaurant,
} = require("../controllers/employees.controller");

const { checkJWT } = require("../middlewares/jwt-validator");
const router = express.Router();

router.use(checkJWT);

router.get("/", getAllEmployeesFromRestaurant);

router.post("/", createEmployee);

router.put("/:codigo", updateEmployee);

router.delete("/:codigo", deleteEmployee);

module.exports = router;
