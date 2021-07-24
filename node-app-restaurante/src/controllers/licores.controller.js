const RestaurantModel = require("../models/Restaurant.model");
const {
  createNewBitacoraEntry,
} = require("../controllers/bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");
const LicoresModel = require("../models/Licores.model");

const getAllLicoresFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;

  const licores = await LicoresModel.find({
    restaurante: restaurant,
  }).populate("restaurante nacionalidad");

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "Licores GET",
    req.body
  );

  console.log(bitacora);

  return res.json({
    ok: true,
    licores,
  });
};

const createLicores = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("LICORES", restaurant);

    req.body.codigo = consecutivo;
    req.body.restaurante = restaurant;

    const licores = new LicoresModel(req.body);

    await licores.save();

    //restaurantDB.licoress.push(licores);

    //await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "Licores INSERT",
      req.body
    );

    return res.json({
      ok: true,
      licores,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateLicores = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const licores = await LicoresModel.findOneAndUpdate(
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
      "Licores UPDATE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      licores,
    });
  } catch (error) {
    next(error);
  }
};

const deleteLicores = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const licores = await LicoresModel.findOneAndRemove({
      restaurante: restaurant,
      codigo,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "Licores DELETE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      licores,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllLicoresFromRestaurant,
  createLicores,
  updateLicores,
  deleteLicores,
};
