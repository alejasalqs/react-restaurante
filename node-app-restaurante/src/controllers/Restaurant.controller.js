const RestaurantModel = require("../models/Restaurant.model");

const getAllRestaurantsByDB = async (req, res, next) => {
  const restaurants = await RestaurantModel.find();

  return res.json({
    ok: true,
    restaurants,
  });
};

const getRestaurantByID = async (req, res, next) => {
  const { id } = req.params;

  const restaurants = await RestaurantModel.findById(id);

  return res.json({
    ok: true,
    restaurants,
  });
};

const createRestaurant = async (req, res, next) => {
  try {
    const restaurant = new RestaurantModel(req.body);

    const savedDB = await restaurant.save();

    return res.status(201).json({
      ok: true,
      restaurant: savedDB,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateRestaurant = async (req, res, next) => {
  try {
    // Hay que revisar este metodo por los campos encriptados
    const { id } = req.params;

    const restaurant = await RestaurantModel.findById(id);

    if (!restaurant) {
      return res.status(400).json({
        ok: false,
        error: "Can not found database",
      });
    }

    const updatedRestaurant = await RestaurantModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      restaurant: updatedRestaurant,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRestaurant = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurant = await RestaurantModel.findById(id);

    if (!restaurant) {
      return res.status(400).json({
        ok: false,
        error: "Can not found database",
      });
    }

    const deletedDB = await RestaurantModel.findByIdAndDelete(id, {});

    res.status(201).json({
      ok: true,
      restaurant: deletedDB,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllRestaurantsByDB,
  getRestaurantByID,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
