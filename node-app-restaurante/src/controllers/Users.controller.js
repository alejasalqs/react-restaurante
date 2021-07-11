const bcrypt = require("bcrypt");
const UsersModel = require("../models/Users.model");

const getAllUsersFromRestaurant = async (req, res, next) => {
  const { restaurant } = req.user;

  const users = await UsersModel.find({ restaurante: restaurant });

  return res.json({
    ok: true,
    users,
  });
};

const createUser = async (req, res, next) => {
  try {
    const user = new UsersModel(req.body);

    // Encriptar password
    const salt = bcrypt.genSaltSync(); // Por defecto da 10 vueltas
    user.password = bcrypt.hashSync(req.body.password, salt);

    const savedDB = await user.save();

    return res.status(201).json({
      ok: true,
      user: savedDB,
    });
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  try {
    // Hay que revisar este metodo por los campos encriptados
    const { id } = req.params;

    const user = await UsersModel.findById(id);

    if (!user) {
      return res.status(400).json({
        ok: false,
        error: "Can not found user",
      });
    }

    const updatedUser = await UsersModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await UsersModel.findById(id);

    if (!user) {
      return res.status(400).json({
        ok: false,
        error: "Can not found database",
      });
    }

    const deletedUser = await UsersModel.findByIdAndDelete(id, {});

    res.status(200).json({
      ok: true,
      user: deletedUser,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsersFromRestaurant,
  createUser,
  updateUser,
  deleteUser,
};
