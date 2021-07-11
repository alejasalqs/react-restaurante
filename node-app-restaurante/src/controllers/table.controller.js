const RestaurantModel = require("../models/Restaurant.model");
const TableModel = require("../models/Table.model");

const getAllTablesFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;
  const tables = await TableModel.find({ restaurante: restaurant });

  return res.json({
    ok: true,
    tables,
  });
};

const createTable = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    console.log(restaurantDB);

    const table = new TableModel({ ...req.body, restaurante: restaurant });

    await table.save();

    restaurantDB.mesas.push(table);

    await restaurantDB.save();

    return res.json({
      ok: true,
      table,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateTable = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const table = await TableModel.findOneAndUpdate(
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
      table,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTable = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const table = await TableModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    return res.json({
      ok: true,
      table,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTablesFromRestaurant,
  createTable,
  updateTable,
  deleteTable,
};