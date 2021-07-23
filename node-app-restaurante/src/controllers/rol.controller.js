const RestaurantModel = require("../models/Restaurant.model");
const RolModel = require("../models/Rol.model");
const { createNewBitacoraEntry } = require("./bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllRolsFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;
  const rols = await RolModel.find({ restaurante: restaurant });

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "ROL INSERT",
    req.body
  );

  return res.json({
    ok: true,
    rols,
  });
};

const createRol = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("ROL", restaurant);

    req.body.codigo = consecutivo;
    req.body.restaurante = restaurant;

    const rol = new RolModel(req.body);

    await rol.save();

    restaurantDB.roles.push(rol);

    //await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "ROL INSERT",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      rol,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateRol = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const rol = await RolModel.findOneAndUpdate(
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
      "ROL UPDATE",
      req.body
    );

    return res.json({
      ok: true,
      rol,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRol = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { codigo } = req.params;

    const rol = await RolModel.findOneAndRemove({
      restaurante: restaurant,
      codigo,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "ROL DELETE",
      req.body
    );

    return res.json({
      ok: true,
      rol,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllRolsFromRestaurant,
  createRol,
  updateRol,
  deleteRol,
};
