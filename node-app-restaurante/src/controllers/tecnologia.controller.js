const RestaurantModel = require("../models/Restaurant.model");
const TecnologiaModel = require("../models/Tecnologia.model");
const { createNewBitacoraEntry } = require("./bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllProductosTecnologiaFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;
  const productos_tecnologia = await TecnologiaModel.find({
    restaurante: restaurant,
  }).populate("restaurante");

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "TECNOLOGIA GET",
    req.body
  );

  return res.json({
    ok: true,
    productos_tecnologia,
  });
};

const createProductosTecnologia = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("TECNOLOGIAS");

    req.body.codigo = consecutivo;
    req.body.restaurante = restaurant;

    const producto_tecnologia = new TecnologiaModel(req.body);

    await producto_tecnologia.save();

    restaurantDB.tecnologia.push(producto_tecnologia);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "TECNOLOGIA INSERT",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      producto_tecnologia,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateProductosTecnologia = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const producto_tecnologia = await TecnologiaModel.findOneAndUpdate(
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
      "TECNOLOGIA UPDATE",
      req.body
    );

    return res.json({
      ok: true,
      producto_tecnologia,
    });
  } catch (error) {
    next(error);
  }
};

const deleteProductosTecnologia = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const producto_tecnologia = await TecnologiaModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "TECNOLOGIA DELETE",
      req.body
    );

    return res.json({
      ok: true,
      producto_tecnologia,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProductosTecnologiaFromRestaurant,
  createProductosTecnologia,
  updateProductosTecnologia,
  deleteProductosTecnologia,
};
