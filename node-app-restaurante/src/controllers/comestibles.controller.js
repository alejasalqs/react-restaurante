const comestiblesModel = require("../models/comestibles.model");
const RestaurantModel = require("../models/Restaurant.model");
const { createNewBitacoraEntry } = require("./bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllComestiblesFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;
  const comestibles = await comestiblesModel.find({ restaurante: restaurant });

  return res.json({
    ok: true,
    comestibles,
  });
};

const createComestible = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("COMESTIBLE");

    req.body.codigo = consecutivo;
    req.body.restaurante = restaurant;

    const comestible = new comestiblesModel(req.body);

    await comestible.save();

    restaurantDB.comestibles.push(comestible);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "COMESTIBLE INSERT",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      comestible,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateComestible = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const comestible = await comestiblesModel.findOneAndUpdate(
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
      "COMESTIBLE UPDATE",
      req.body
    );

    return res.json({
      ok: true,
      comestible,
    });
  } catch (error) {
    next(error);
  }
};

const deleteComestible = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const comestible = await comestiblesModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "COMESTIBLE DELETE",
      req.body
    );

    return res.json({
      ok: true,
      comestible,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllComestiblesFromRestaurant,
  createComestible,
  updateComestible,
  deleteComestible,
};
