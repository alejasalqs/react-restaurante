const RestaurantModel = require("../models/Restaurant.model");
const {
  createNewBitacoraEntry,
} = require("../controllers/bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");
const VinosModel = require("../models/Vinos.model");

const getAllVinosFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;

  const vinos = await VinosModel.find({
    restaurante: restaurant,
  }).populate("restaurante");

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "Vinos GET",
    req.body
  );

  console.log(bitacora);

  return res.json({
    ok: true,
    vinos,
  });
};

const createVinos = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("VINOS", restaurant);

    req.body.codigo = consecutivo;

    const vinos = new VinosModel(req.body);

    await vinos.save();

    //restaurantDB.vinoss.push(vinos);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "Vinos INSERT",
      req.body
    );

    return res.json({
      ok: true,
      vinos,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateVinos = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const vinos = await VinosModel.findOneAndUpdate(
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
      "Vinos UPDATE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      vinos,
    });
  } catch (error) {
    next(error);
  }
};

const deleteVinos = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const vinos = await VinosModel.findOneAndRemove({
      restaurante: restaurant,
      codigo,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "Vinos DELETE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      vinos,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllVinosFromRestaurant,
  createVinos,
  updateVinos,
  deleteVinos,
};
