const bcrypt = require("bcrypt");
const { generateJWT } = require("../helpers/jwt-helper");
const UsersModel = require("../models/Users.model");

const login = async (req, res, next) => {
  const { login, password } = req.body;
  const findUser = await UsersModel.findOne({ login });

  if (!findUser) {
    // Valida que no exista el usuario con el correo ingresado
    return res.status(400).json({
      ok: false,
      error: `There is no user with the user name ${login}.`,
    });
  }

  // Hacer match de los passwords
  // Esta funcion devuelve true o false
  const validPassword = bcrypt.compareSync(password, findUser.password);

  if (!validPassword) {
    return res.status(400).json({
      ok: false,
      error: `Invalid password.`,
    });
  }

  // Generar web token
  const token = await generateJWT(
    findUser.id,
    findUser.name,
    findUser.restaurante
  );

  return res.json({
    ok: true,
    user: findUser,
    token,
  });
};

const renewToken = async (req, res) => {
  // Comom ya paso por el middleware de verificar el token aqui ya tenemos la info del usuario

  // Generar web token
  const token = await generateJWT(
    req.user.uid,
    req.user.name,
    req.user.restaurante
  );
  res.json({
    ok: true,
    token,
    uid: req.user.uid,
    name: req.user.name,
  });
};

module.exports = {
  login,
  renewToken,
};
