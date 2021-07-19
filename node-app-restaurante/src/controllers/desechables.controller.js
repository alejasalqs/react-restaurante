const DesechablesModel = require("../models/Desechables.model");
const RestaurantModel = require("../models/Restaurant.model");
const { createNewBitacoraEntry } = require("./bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllDesechablesFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;
  const productos_desechables = await DesechablesModel.find({
    restaurante: restaurant,
  });

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "DESECHABLE GET",
    req.body
  );

  return res.json({
    ok: true,
    productos_desechables,
  });
};

const createDesechables = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("DESECHABLE");

    req.body.codigo = consecutivo;
    req.body.restaurante = restaurant;

    const desechable = new DesechablesModel(req.body);

    await desechable.save();

    restaurantDB.desechables.push(desechable);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "DESECHABLE INSERT",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      desechable,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateDesechables = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const desechable = await DesechablesModel.findOneAndUpdate(
      {
        restaurante: restaurant,
        _id: id,
      },
      req.body,
      {
        new: true,
      }
    );

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "DESECHABLE UPDATE",
      req.body
    );

    return res.json({
      ok: true,
      desechable,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDesechables = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const desechable = await DesechablesModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "DESECHABLE DELETE",
      req.body
    );

    return res.json({
      ok: true,
      desechable,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllDesechablesFromRestaurant,
  createDesechables,
  updateDesechables,
  deleteDesechables,
};
