const PositionModel = require("../models/Position.model");
const RestaurantModel = require("../models/Restaurant.model");
const { createNewBitacoraEntry } = require("./bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllPositions = async (req, res, next) => {
  const { restaurant } = req.user;
  const position = await PositionModel.find({ restaurante: restaurant });

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "PUESTOS GET",
    req.body
  );

  return res.json({
    ok: true,
    position,
  });
};

const createPosition = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("PUESTO", restaurant);

    req.body.codigo = consecutivo;
    req.body.restaurante = restaurant;

    const position = new PositionModel(req.body);

    await position.save();

    restaurantDB.puestos.push(position);

    //await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "PUESTOS INSERT",
      req.body
    );

    //console.log(bitacora);

    return res.json({
      ok: true,
      position,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updatePosition = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const position = await PositionModel.findOneAndUpdate(
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
      "PUESTOS UPDATE",
      req.body
    );

    return res.json({
      ok: true,
      position,
    });
  } catch (error) {
    next(error);
  }
};

const deletePosition = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const position = await PositionModel.findOneAndRemove({
      restaurante: restaurant,
      codigo,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "PUESTOS ELIMINAR",
      req.body
    );

    return res.json({
      ok: true,
      position,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPositions,
  createPosition,
  updatePosition,
  deletePosition,
};
