const RestaurantModel = require("../models/Restaurant.model");
const UnidadMedidaModel = require("../models/UnidadMedida.model");
const { createNewBitacoraEntry } = require("./bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllUnidadMedida = async (req, res, next) => {
  const { restaurant } = req.user;
  const unidad_medida = await UnidadMedidaModel.find({
    restaurante: restaurant,
  });

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "UNIDAD_MEDIDA GET",
    req.body
  );

  return res.json({
    ok: true,
    unidad_medida,
  });
};

const createUnidadMedida = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("UNIDAD_MEDIDA");

    req.body.codigo = consecutivo;
    req.body.restaurante = restaurant;

    const unidad_medida = new UnidadMedidaModel(req.body);

    await unidad_medida.save();

    restaurantDB.unidad_medida.push(unidad_medida);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "UNIDAD_MEDIDA INSERT",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      unidad_medida,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateUnidadMedida = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const unidad_medida = await UnidadMedidaModel.findOneAndUpdate(
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
      "UNIDAD_MEDIDA UPDATE",
      req.body
    );

    return res.json({
      ok: true,
      unidad_medida,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUnidadMedida = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const unidad_medida = await UnidadMedidaModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "UNIDAD_MEDIDA DELETE",
      req.body
    );

    return res.json({
      ok: true,
      unidad_medida,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllUnidadMedida,
  createUnidadMedida,
  updateUnidadMedida,
  deleteUnidadMedida,
};
