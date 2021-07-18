const BitacoraModel = require("../models/Bitacora.model");
const RestaurantModel = require("../models/Restaurant.model");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getBitacora = async (req, res, next) => {
  const bitacora = await BitacoraModel.find();

  return res.json({
    ok: true,
    bitacora,
  });
};

const createNewBitacoraEntry = async (userInfo, actionType, data) => {
  try {
    const { uid, restaurant } = userInfo;

    //const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("BITACORA");

    const bitacora = new BitacoraModel({
      codigo: consecutivo,
      usuario: uid,
      fecha: new Date(),
      descripcion: `${actionType.toUpperCase()} ${JSON.stringify(data)}`,
      restaurante: restaurant,
    });

    await bitacora.save();

    //restaurantDB.bitacora.push(bitacora);

    //await restaurantDB.save();

    return bitacora;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getBitacora,
  createNewBitacoraEntry,
};
