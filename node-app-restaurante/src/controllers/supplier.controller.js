const RestaurantModel = require("../models/Restaurant.model");
const SupplierModel = require("../models/Supplier.model");

const getAllSuppliersFromRestaurant = async (req, res, next) => {
  const suppliers = await SupplierModel.find();

  return res.json({
    ok: true,
    suppliers,
  });
};

const createSupplier = async (req, res, next) => {
  try {
    //const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(req.body.restaurante);

    const supplier = new SupplierModel(req.body);

    await supplier.save();

    restaurantDB.proveedores.push(supplier);

    await restaurantDB.save();

    return res.json({
      ok: true,
      supplier,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateSupplier = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const supplier = await SupplierModel.findOneAndUpdate(
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
      supplier,
    });
  } catch (error) {
    next(error);
  }
};

const deleteSupplier = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const supplier = await SupplierModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    return res.json({
      ok: true,
      supplier,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllSuppliersFromRestaurant,
  createSupplier,
  updateSupplier,
  deleteSupplier,
};
