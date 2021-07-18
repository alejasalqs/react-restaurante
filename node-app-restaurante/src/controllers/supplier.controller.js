const RestaurantModel = require("../models/Restaurant.model");
const SupplierModel = require("../models/Supplier.model");
const { generateNewConsecutivo } = require("./consecutivos.controller");
const { createNewBitacoraEntry } = require("./bitacora.controller");

const getAllSuppliersFromRestaurant = async (req, res, next) => {
  const suppliers = await SupplierModel.find();

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "PROVEEDOR GET",
    req.body
  );

  return res.json({
    ok: true,
    suppliers,
  });
};

const createSupplier = async (req, res, next) => {
  try {
    //const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(req.body.restaurante);

    const consecutivo = await generateNewConsecutivo("PROVEEDOR");

    req.body.codigo = consecutivo;

    const supplier = new SupplierModel(req.body);

    await supplier.save();

    restaurantDB.proveedores.push(supplier);

    await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "PROVEEDOR INSERT",
      req.body
    );

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

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "PROVEEDOR UPDATE",
      req.body
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

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "PROVEEDOR DELETE",
      req.body
    );

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
