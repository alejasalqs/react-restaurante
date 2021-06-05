const DataBaseModel = require("../models/DataBase.model");

const getAllDataBases = async (req, res, next) => {
  const databases = await DataBaseModel.find();

  return res.json({
    ok: true,
    databases,
  });
};

const getDataBaseByID = async (req, res, next) => {
  const { id } = req.params;

  const database = await DataBaseModel.findById(id);
  return res.json({
    ok: true,
    database,
  });
};

const createNewDataBase = async (req, res, next) => {
  try {
    const db = new DataBaseModel(req.body);

    const savedDB = await db.save();

    return res.status(201).json({
      ok: true,
      database: savedDB,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateDataBase = async (req, res, next) => {
  try {
    // Hay que revisar este metodo por los campos encriptados
    const { id } = req.params;

    const database = await DataBaseModel.findById(id);

    if (!database) {
      return res.status(400).json({
        ok: false,
        error: "Can not found database",
      });
    }

    const updatedDataBase = await DataBaseModel.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );

    return res.json({
      ok: true,
      database: updatedDataBase,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteDataBase = async (req, res, next) => {
  try {
    const { id } = req.params;

    const database = await DataBaseModel.findById(id);

    if (!database) {
      return res.status(400).json({
        ok: false,
        error: "Can not found database",
      });
    }

    const deletedDB = await DataBaseModel.findByIdAndDelete(id, {});

    res.status(201).json({
      ok: true,
      database: deletedDB,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllDataBases,
  getDataBaseByID,
  createNewDataBase,
  updateDataBase,
  deleteDataBase,
};
