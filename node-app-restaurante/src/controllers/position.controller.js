const PositionModel = require("../models/Position.model");

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
    const { restaurant } = req.user;

    const restaurantDB = await PositionModel.findById(restaurant);

    const position = new PositionModel(req.body);

    await table.save();

    restaurantDB.mesas.push(employee);

    await restaurantDB.save();

    return res.json({
      ok: true,
      position,
      restaurantDB,
    });
  } catch (error) {
    console.log(error);
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
    console.log(error);
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
    console.log(error);
  }
};

module.exports = {
  getAllPositions,
  createPosition,
  updatePosition,
  deletePosition,
};
