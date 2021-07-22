const BitacoraModel = require("../models/Bitacora.model");
const ConsecutivosModel = require("../models/Consecutivos.model");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getBitacora = async (req, res, next) => {
  const bitacora = await BitacoraModel.find().populate("usuario restaurante");

  return res.json({
    ok: true,
    bitacora,
  });
};

const createNewBitacoraEntry = async (userInfo, actionType, data) => {
  try {
    const { uid, restaurant } = userInfo;

    //const restaurantDB = await RestaurantModel.findById(restaurant);

    let consecutivo = await ConsecutivosModel.find({ tipo: "BITACORA" });

    if (!consecutivo)
      throw new Error(
        `No se encontró consecutivo para ${tipo} por favor agregue uno.`
      );

    consecutivo[0].valor_consecutivo = consecutivo[0].valor_consecutivo + 1;

    let newConsecutivo = await ConsecutivosModel.findByIdAndUpdate(
      consecutivo[0]._id,
      consecutivo[0],
      { new: true }
    );

    const bitacora = new BitacoraModel({
      codigo: `${newConsecutivo.prefijo}${newConsecutivo.valor_consecutivo}`,
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
