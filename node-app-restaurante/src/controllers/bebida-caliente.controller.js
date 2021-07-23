const RestaurantModel = require("../models/Restaurant.model");
const {
  createNewBitacoraEntry,
} = require("../controllers/bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");
const BebidaCalienteModel = require("../models/BebidaCaliente.model");

const getAllBebidaCalienteFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;

  const bebida_caliente = await BebidaCalienteModel.find({
    restaurante: restaurant,
  }).populate("restaurante");

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "BEBIDA CALIENTE GET",
    req.body
  );

  console.log(bitacora);

  return res.json({
    ok: true,
    bebida_caliente,
  });
};

const createBebidaCaliente = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo(
      "BEBIDACALIENTE",
      restaurant
    );

    req.body.codigo = consecutivo;

    const bebida_caliente = new BebidaCalienteModel(req.body);

    await bebida_caliente.save();

    //restaurantDB.bebida_calientes.push(bebida_caliente);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "BEBIDACALIENTE INSERT",
      req.body
    );

    return res.json({
      ok: true,
      bebida_caliente,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateBebidaCaliente = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const bebida_caliente = await BebidaCalienteModel.findOneAndUpdate(
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
      "BEBIDACALIENTE UPDATE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      bebida_caliente,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBebidaCaliente = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const bebida_caliente = await BebidaCalienteModel.findOneAndRemove({
      restaurante: restaurant,
      codigo,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "bebida_caliente DELETE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      bebida_caliente,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBebidaCalienteFromRestaurant,
  createBebidaCaliente,
  updateBebidaCaliente,
  deleteBebidaCaliente,
};
