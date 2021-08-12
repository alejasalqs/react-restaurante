const BrandModel = require("../models/Brand.model");
const RestaurantModel = require("../models/Restaurant.model");
const {
  createNewBitacoraEntry,
} = require("../controllers/bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllBrandsFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;

  const brands = await BrandModel.find({ restaurante: restaurant }).populate(
    "nacionalidad restaurante"
  );

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "MARCAS GET",
    req.body
  );

  return res.json({
    ok: true,
    brands,
  });
};

const createBrand = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(restaurant);

    const consecutivo = await generateNewConsecutivo("MARCAS", restaurant);

    req.body.codigo = consecutivo;
    req.body.restaurante = restaurant;

    const brand = new BrandModel(req.body);

    await brand.save();

    //restaurantDB.marcas.push(brand);

    //await restaurantDB.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "MARCAS INSERT",
      req.body
    );

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
    const { codigo } = req.params;

    const brand = await BrandModel.findOneAndUpdate(
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
      "MARCAS UPDATE",
      req.body
    );

    console.log(bitacora);

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
    const { codigo } = req.params;

    const brand = await BrandModel.findOneAndRemove({
      restaurante: restaurant,
      codigo,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "MARCAS DELETE",
      req.body
    );

    console.log(bitacora);

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
