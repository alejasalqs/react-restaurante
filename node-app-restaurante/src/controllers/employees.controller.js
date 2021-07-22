const EmployeesModel = require("../models/Employees.model");
const RestaurantModel = require("../models/Restaurant.model");
const { createNewBitacoraEntry } = require("./bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllEmployeesFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;
  const employees = await EmployeesModel.find({
    restaurante: restaurant,
  }).populate("puesto nacionalidad restaurante");

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "EMPLEADOS GET",
    req.body
  );

  return res.json({
    ok: true,
    employees,
  });
};

const createEmployee = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(req.body.restaurante);

    const consecutivo = await generateNewConsecutivo("EMPLEADOS");

    req.body.codigo = consecutivo;

    const employee = new EmployeesModel(req.body);

    await employee.save();

    restaurantDB.empleados.push(employee);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "EMPLEADOS INSERT",
      req.body
    );

    return res.json({
      ok: true,
      employee,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const employee = await EmployeesModel.findOneAndUpdate(
      {
        restaurante: restaurant,
        codigo,
      },
      req.body,
      {
        new: true,
      }
    );

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "EMPLEADOS UPDATE",
      req.body
    );

    return res.json({
      ok: true,
      employee,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const employee = await EmployeesModel.findOneAndRemove({
      restaurante: restaurant,
      codigo,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "EMPLEADOS DELETE",
      req.body
    );

    return res.json({
      ok: true,
      employee,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllEmployeesFromRestaurant,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
