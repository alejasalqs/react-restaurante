const ClientModel = require("../models/Client.model");
const RestaurantModel = require("../models/Restaurant.model");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllClientsFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;
  const clients = await ClientModel.find({ restaurante: restaurant });

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "CLIENTES GET",
    req.body
  );

  return res.json({
    ok: true,
    clients,
  });
};

const createClient = async (req, res, next) => {
  try {
    const restaurantDB = await RestaurantModel.findById(req.body.restaurante);

    const consecutivo = await generateNewConsecutivo("CLIENTE");

    req.body.consecutivo = consecutivo;
    req.body.fecha = new Date();

    const client = new ClientModel(req.body);

    await client.save();

    restaurantDB.clientes.push(client);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "CLIENTES INSERT",
      req.body
    );

    console.log(bitacora);

    return res.json({
      ok: true,
      client,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateClient = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const client = await ClientModel.findOneAndUpdate(
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
      "CLIENTES UPDATE",
      req.body
    );

    return res.json({
      ok: true,
      client,
    });
  } catch (error) {
    next(error);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const client = await ClientModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "CLIENTES DELETE",
      req.body
    );

    return res.json({
      ok: true,
      client,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllClientsFromRestaurant,
  createClient,
  updateClient,
  deleteClient,
};
