const RestaurantModel = require("../models/Restaurant.model");
const {
  createNewBitacoraEntry,
} = require("../controllers/bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");
const BebidaHeladaModel = require("../models/BebidaHelada.model");

const getAllBebidaHeladaFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;

  const bebida_helada = await BebidaHeladaModel.find({
    restaurante: restaurant,
  }).populate("restaurante");

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "BEBIDAHELADA GET",
    req.body
  );

  console.log(bitacora);

  return res.json({
    ok: true,
    bebida_helada,
  });
};

const createBebidaHelada = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo(
      "BEBIDAHELADA",
      restaurant
    );

    req.body.codigo = consecutivo;

    const bebida_helada = new BebidaHeladaModel(req.body);

    await bebida_helada.save();

    //restaurantDB.bebida_heladas.push(bebida_helada);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "BEBIDAHELADA INSERT",
      req.body
    );

    return res.json({
      ok: true,
      bebida_helada,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateBebidaHelada = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const bebida_helada = await BebidaHeladaModel.findOneAndUpdate(
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
      "BEBIDAHELADA UPDATE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      bebida_helada,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBebidaHelada = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const bebida_helada = await BebidaHeladaModel.findOneAndRemove({
      restaurante: restaurant,
      codigo,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "BEBIDAHELADA DELETE",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      bebida_helada,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBebidaHeladaFromRestaurant,
  createBebidaHelada,
  updateBebidaHelada,
  deleteBebidaHelada,
};
