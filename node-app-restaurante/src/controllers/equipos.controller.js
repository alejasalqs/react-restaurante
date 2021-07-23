const EquiposModel = require("../models/Equipos.model");
const RestaurantModel = require("../models/Restaurant.model");
const { createNewBitacoraEntry } = require("./bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllEquiposUtensiliosFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;
  const equipos_utencilios = await EquiposModel.find({
    restaurante: restaurant,
  }).populate("restaurante");

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "EQUIPOS UTENCILIOS GET",
    req.body
  );

  return res.json({
    ok: true,
    equipos_utencilios,
  });
};

const createEquiposUtencilios = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("EQUIPOS", restaurant);

    req.body.codigo = consecutivo;
    req.body.restaurante = restaurant;

    const equipos_utencilios = new EquiposModel(req.body);

    await equipos_utencilios.save();

    restaurantDB.equipos_cocina.push(equipos_utencilios);

    //await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "EQUIPOS UTENCILIOS INSERT",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      equipos_utencilios,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateEquiposUtencilios = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const equipos_utencilios = await EquiposModel.findOneAndUpdate(
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
      "EQUIPOS UTENCILIOS UPDATE",
      req.body
    );

    return res.json({
      ok: true,
      equipos_utencilios,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEquiposUtencilios = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const equipos_utencilios = await EquiposModel.findOneAndRemove({
      restaurante: restaurant,
      codigo,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "TECNOLOGIA DELETE",
      req.body
    );

    return res.json({
      ok: true,
      equipos_utencilios,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllEquiposUtensiliosFromRestaurant,
  createEquiposUtencilios,
  updateEquiposUtencilios,
  deleteEquiposUtencilios,
};
