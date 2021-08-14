const PedidosModel = require("../models/Pedidos.model");
const RestaurantModel = require("../models/Restaurant.model");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllPedidosFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;
  const pedidos = await PedidosModel.find({ restaurante: restaurant });

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "PEDIDOS GET",
    req.body
  );

  return res.json({
    ok: true,
    pedidos,
  });
};

const createPedido = async (req, res, next) => {
  try {
    const restaurantDB = await RestaurantModel.findById(req.body.restaurante);

    const consecutivo = await generateNewConsecutivo("pedidoE", restaurant);

    req.body.consecutivo = consecutivo;
    req.body.fecha = new Date();

    const pedido = new PedidosModel(req.body);

    await pedido.save();

    restaurantDB.PEDIDOS.push(pedido);

    //await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "PEDIDOS INSERT",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      pedido,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updatePedido = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const pedido = await PedidosModel.findOneAndUpdate(
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
      "PEDIDOS UPDATE",
      req.body
    );

    return res.json({
      ok: true,
      pedido,
    });
  } catch (error) {
    next(error);
  }
};

const deletePedido = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const pedido = await PedidosModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "PEDIDOS DELETE",
      req.body
    );

    return res.json({
      ok: true,
      pedido,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllPedidosFromRestaurant,
  createPedido,
  updatePedido,
  deletePedido,
};
