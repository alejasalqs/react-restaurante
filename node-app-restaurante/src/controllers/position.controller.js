const PositionModel = require("../models/Position.model");
const RestaurantModel = require("../models/Restaurant.model");

const getAllPositions = async (req, res, next) => {
  const { restaurant } = req.user;
  const position = await PositionModel.find({ restaurante: restaurant });

  return res.json({
    ok: true,
    position,
  });
};

const createPosition = async (req, res, next) => {
  try {
    //const { restaurant } = req.user;

    const restaurantDB = await RestaurantModel.findById(req.body.restaurante);

    const position = new PositionModel(req.body);

    await position.save();

    restaurantDB.puestos.push(position);

    await restaurantDB.save();

    return res.json({
      ok: true,
      position,
      restaurantDB,
    });
  } catch (error) {
    next(error);
  }
};

const updatePosition = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const position = await PositionModel.findOneAndUpdate(
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
      position,
    });
  } catch (error) {
    next(error);
  }
};

const deletePosition = async (req, res, next) => {
  try {
    const { restaurant } = req.user;
    const { id } = req.params;

    const position = await PositionModel.findOneAndRemove({
      restaurante: restaurant,
      _id: id,
    });

    return res.json({
      ok: true,
      position,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPositions,
  createPosition,
  updatePosition,
  deletePosition,
};
