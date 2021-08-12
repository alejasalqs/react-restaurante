const CountryModel = require("../models/Country.model");
const RestaurantModel = require("../models/Restaurant.model");
const { createNewBitacoraEntry } = require("./bitacora.controller");
const { generateNewConsecutivo } = require("./consecutivos.controller");

const getAllCountries = async (req, res, next) => {
  const countries = await CountryModel.find({});

  const bitacora = await createNewBitacoraEntry(
    req.user,
    "PAISES GET",
    req.body
  );

  return res.json({
    ok: true,
    countries,
  });
};

const selectCountries = async (req, res, next) => {
  const data = await CountryModel.find({}).select("pais");

  return res.json({
    ok: true,
    data,
  });
};

const createCountry = async (req, res, next) => {
  try {
    const { restaurant } = req.user;

    const consecutivo = await generateNewConsecutivo("PAIS", restaurant);

    req.body.codigo = consecutivo;

    const country = new CountryModel(req.body);

    await country.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "PAISES INSERT",
      req.body
    );

    return res.json({
      ok: true,
      country,
    });
  } catch (error) {
    next(error);
  }
};

const updateCountry = async (req, res, next) => {
  try {
    const { codigo } = req.params;

    const country = await CountryModel.findOneAndUpdate(
      {
        codigo,
      },
      req.body,
      {
        new: true,
      }
    );

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "PAISES UPDATE",
      req.body
    );

    return res.json({
      ok: true,
      country,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCountry = async (req, res, next) => {
  try {
    const { codigo } = req.params;

    const country = await CountryModel.findOneAndRemove({
      codigo,
    });

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "PAISES DELETE",
      req.body
    );

    return res.json({
      ok: true,
      country,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllCountries,
  selectCountries,
  createCountry,
  updateCountry,
  deleteCountry,
};
