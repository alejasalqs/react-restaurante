const RestaurantModel = require("../models/Restaurant.model");
const {
  createNewBitacoraEntry,
} = require("../controllers/bitacora.controller");
const EspecialesModel = require("../models/Especiales.model");

const getAllEspecialesFromRestaurant = async (req, res, next) => {
  const especiales = await EspecialesModel.find();

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "Especiales GET",
    req.body
  );

  console.log(bitacora);

  return res.json({
    ok: true,
    especiales,
  });
};

const createEspeciales = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("ESPECIALES");

    req.body.codigo = consecutivo;

    const especiales = new EspecialesModel(req.body);

    await especiales.save();

    restaurantDB.especiales.push(especiales);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "ESPECIALES INSERT",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      especiales,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateEspeciales = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const especiales = await EspecialesModel.findOneAndUpdate(
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
      "ESPECIALES UPDATE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      especiales,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEspeciales = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const especiales = await EspecialesModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "ESPECIALES DELETE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      especiales,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEspecialesFromRestaurant,
  createEspeciales,
  updateEspeciales,
  deleteEspeciales,
};
