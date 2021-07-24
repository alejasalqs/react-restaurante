const RestaurantModel = require("../models/Restaurant.model");
const {
  createNewBitacoraEntry,
} = require("../controllers/bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");
const BebidaGaseosaModel = require("../models/BebidaGaseosa.model");

const getAllBebidaGaseosaFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;

  const bebida_gaseosa = await BebidaGaseosaModel.find({
    restaurante: restaurant,
  }).populate("restaurante");

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "BEBIDAGASEOSA GET",
    req.body
  );

  console.log(bitacora);

  return res.json({
    ok: true,
    bebida_gaseosa,
  });
};

const createBebidaGaseosa = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo(
      "BEBIDAGASEOSA",
      restaurant
    );

    req.body.codigo = consecutivo;
    req.body.restaurante = restaurant;

    const bebida_gaseosa = new BebidaGaseosaModel(req.body);

    await bebida_gaseosa.save();

    //restaurantDB.bebida_gaseosas.push(bebida_gaseosa);

    //await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "BEBIDAGASEOSA INSERT",
      req.body
    );

    return res.json({
      ok: true,
      bebida_gaseosa,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateBebidaGaseosa = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const bebida_gaseosa = await BebidaGaseosaModel.findOneAndUpdate(
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
      "BEBIDAGASEOSA UPDATE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      bebida_gaseosa,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBebidaGaseosa = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const bebida_gaseosa = await BebidaGaseosaModel.findOneAndRemove({
      restaurante: restaurant,
      codigo,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "BEBIDAGASEOSA DELETE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      bebida_gaseosa,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBebidaGaseosaFromRestaurant,
  createBebidaGaseosa,
  updateBebidaGaseosa,
  deleteBebidaGaseosa,
};
