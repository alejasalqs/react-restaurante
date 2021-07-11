const bcrypt = require("bcrypt");
const BrandModel = require("../models/Brand.model");
const RestaurantModel = require("../models/Restaurant.model");

const getAllBrandsFromRestaurant = async (req, res, next) => {
  const brands = await BrandModel.find();

  return res.json({
    ok: true,
    brands,
  });
};

const createBrand = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const brand = new BrandModel(req.body);

    await brand.save();

    restaurantDB.marcas.push(employee);

    await restaurantDB.save();

    return res.json({
      ok: true,
      brand,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateBrand = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const brand = await BrandModel.findOneAndUpdate(
      {
        restaurante: restaurant,
        _id: id,
      },
      req.body,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const brand = await BrandModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    return res.json({
      ok: true,
      brand,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBrandsFromRestaurant,
  createBrand,
  updateBrand,
  deleteBrand,
};
