const EmployeesModel = require("../models/Employees.model");
const RestaurantModel = require("../models/Restaurant.model");

const getAllEmployeesFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;
  const employees = await EmployeesModel.find({ restaurante: restaurant });

  return res.json({
    ok: true,
    employees,
  });
};

const createEmployee = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(req.body.restaurante);

    const employee = new EmployeesModel(req.body);

    await employee.save();

    restaurantDB.empleados.push(employee);

    await restaurantDB.save();

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
    const { id } = req.params;

    const employee = await EmployeesModel.findOneAndUpdate(
      {
        restaurante: restaurant,
        _id: id,
      },
      req.body,
      {
        new: true,
      }
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
    const { id } = req.params;

    const employee = await EmployeesModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

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
