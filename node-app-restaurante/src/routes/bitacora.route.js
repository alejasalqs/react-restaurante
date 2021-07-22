/*
    Rutas de Users / users
    host + /api/users
*/
const express = require("express");
const { getBitacora } = require("../controllers/bitacora.controller");

const { checkJWT } = require("../middlewares/jwt-validator");

const router = express.Router();

router.use(checkJWT);

router.get("/", getBitacora);

module.exports = router;
