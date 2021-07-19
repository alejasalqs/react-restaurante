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

const createCountry = async (req, res, next) => {
  try {
    const consecutivo = await generateNewConsecutivo("PAIS");

    req.body.codigo = consecutivo;

    const country = new CountryModel(req.body);

    await country.save();

    const bitacora = await createNewBitacoraEntry(
      req.user,
      "PAISES INSERT",
      req.body
    );

    console.log(bitacora);

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
    const { id } = req.params;

    const country = await CountryModel.findOneAndUpdate(
      {
        _id: id,
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
    const { id } = req.params;

    const country = await CountryModel.findOneAndRemove({
      _id: id,
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
  createCountry,
  updateCountry,
  deleteCountry,
};
