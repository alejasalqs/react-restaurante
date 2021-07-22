const LimpiezaModel = require("../models/Limpieza.model");
const RestaurantModel = require("../models/Restaurant.model");
const { createNewBitacoraEntry } = require("./bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllProductosLimpiezaFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;
  const productos_desechables = await LimpiezaModel.find({
    restaurante: restaurant,
  }).populate("restaurante");

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "LIMPIEZA GET",
    req.body
  );

  return res.json({
    ok: true,
    productos_desechables,
  });
};

const createProductosLimpieza = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("LIMPIEZA");

    req.body.codigo = consecutivo;
    req.body.restaurante = restaurant;

    const producto_limpieza = new LimpiezaModel(req.body);

    await producto_limpieza.save();

    restaurantDB.limpieza.push(producto_limpieza);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "LIMPIEZA INSERT",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      producto_limpieza,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateProductosLimpieza = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const producto_limpieza = await LimpiezaModel.findOneAndUpdate(
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
      "LIMPIEZA UPDATE",
      req.body
    );

    return res.json({
      ok: true,
      producto_limpieza,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProductosLimpieza = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const producto_limpieza = await LimpiezaModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "LIMPIEZA DELETE",
      req.body
    );

    return res.json({
      ok: true,
      producto_limpieza,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllProductosLimpiezaFromRestaurant,
  createProductosLimpieza,
  updateProductosLimpieza,
  deleteProductosLimpieza,
};
