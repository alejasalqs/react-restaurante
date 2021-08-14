const RestaurantModel = require("../models/Restaurant.model");
const TableModel = require("../models/Table.model");
const { createNewBitacoraEntry } = require("./bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllTablesFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;
  const tables = await TableModel.find({ restaurante: restaurant }).populate(
    "restaurante"
  );

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "MESAS GET",
    req.body
  );

  return res.json({
    ok: true,
    tables,
  });
};

const getTableByIDRestaurant = async (req, res, next) => {
  const { id } = req.params;
  const tables = await TableModel.find({ restaurante: id });

  return res.json({
    ok: true,
    tables,
  });
};

const createTable = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("MESAS", restaurant);
    req.body.codigo = consecutivo;

    const table = new TableModel({ ...req.body, restaurante: restaurant });

    await table.save();

    restaurantDB.mesas.push(table);

    //await restaurantDB.save();

    console.log("CUARTO", restaurantDB);

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "MESAS INSERT",
      req.body
    );

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
    const { codigo } = req.params;

    const table = await TableModel.findOneAndUpdate(
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
      "MESAS UPDATE",
      req.body
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
    const { codigo } = req.params;

    const table = await TableModel.findOneAndRemove({
      restaurante: restaurant,
      codigo,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "MESAS DELETE",
      req.body
    );

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
  getTableByIDRestaurant,
  createTable,
  updateTable,
  deleteTable,
};
