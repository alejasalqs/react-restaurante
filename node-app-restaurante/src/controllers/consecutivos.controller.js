const RestaurantModel = require("../models/Restaurant.model");
const {
  createNewBitacoraEntry,
} = require("../controllers/bitacora.controller");
const ConsecutivosModel = require("../models/Consecutivos.model");

const getConsecutivos = async (req, res, next) => {
  const { restaurant } = req.user;
  const consecutivos = await ConsecutivosModel.find({
    restaurante: restaurant,
  });

  return res.json({
    ok: true,
    consecutivos,
  });
};

const createConsecuivo = async (req, res, next) => {
  try {
    const restaurantDB = await RestaurantModel.findById(req.body.restaurante);

    const consecutivo = new ConsecutivosModel(req.body);

    await consecutivo.save();

    //restaurantDB.consecutivos.push(consecutivo);

    //await restaurantDB.save();

    /*const bitacora = await createNewBitacoraEntry(
      req.user,
      "CONSECUTIVOS INSERT",
      req.body
    );*/

    return res.json({
      ok: true,
      consecutivo,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateConsecutivo = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const consecutivo = await ConsecutivosModel.findOneAndUpdate(
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
      consecutivo,
    });
  } catch (error) {
    next(error);
  }
};

const deleteConsecutivo = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const consecutivo = await ConsecutivosModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    return res.json({
      ok: true,
      consecutivo,
    });
  } catch (error) {
    next(error);
  }
};

const generateNewConsecutivo = async (tipo, restaurant) => {
  let consecutivo = await ConsecutivosModel.find({
    restaurante: restaurant,
    tipo,
  });

  if (!consecutivo)
    throw new Error(
      `No se encontrĂ³ consecutivo para ${tipo} por favor agregue uno.`
    );

  consecutivo[0].valor_consecutivo = consecutivo[0].valor_consecutivo + 1;

  let newConsecutivo = await ConsecutivosModel.findByIdAndUpdate(
    consecutivo[0]._id,
    consecutivo[0],
    { new: true }
  );

  return `${newConsecutivo.prefijo}${newConsecutivo.valor_consecutivo}`;
};

module.exports = {
  getConsecutivos,
  createConsecuivo,
  updateConsecutivo,
  deleteConsecutivo,
  generateNewConsecutivo,
};
