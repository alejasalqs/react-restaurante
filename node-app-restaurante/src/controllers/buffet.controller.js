const RestaurantModel = require("../models/Restaurant.model");
const {
  createNewBitacoraEntry,
} = require("../controllers/bitacora.controller");
const BuffetModel = require("../models/Buffet.model");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllBuffetsFromRestaurant = async (req, res, next) => {
  const buffets = await BuffetModel.find();

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "BUFFETS GET",
    req.body
  );

  console.log(bitacora);

  return res.json({
    ok: true,
    buffets,
  });
};

const createBuffet = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("BUFFET", restaurant);

    req.body.codigo = consecutivo;

    const buffet = new BuffetModel(req.body);

    await buffet.save();

    restaurantDB.buffets.push(buffet);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "BUFFET INSERT",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      buffet,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateBuffet = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const buffet = await BuffetModel.findOneAndUpdate(
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
      "BUFFET UPDATE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      buffet,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBuffet = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const buffet = await BuffetModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "BUFFET DELETE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      buffet,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBuffetsFromRestaurant,
  createBuffet,
  updateBuffet,
  deleteBuffet,
};
