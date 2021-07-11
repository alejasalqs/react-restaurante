/*
    Rutas de Auth / auth
    host + /api/auth
*/
const express = require("express");
const { login, renewToken } = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", login);

router.post("/renew", renewToken);

module.exports = router;
