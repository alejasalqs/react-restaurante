const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const EmployeeSchema = Schema({
  consecutivo: {
    type: String,
    unique: true,
  },
  nombre: {
    required: true,
    type: String,
  },
  apellido1: {
    required: true,
    type: String,
  },
  apellido2: {
    type: String,
  },
  restaurante: {
    required: true,
    type: String,
  },
  cedula: {
    required: true,
    type: String,
  },
  telefono1: {
    type: String,
  },
  telefono2: {
    type: String,
  },
  puesto: {
    required: true,
    type: Number,
  },
  nacionalidad: {
    required: true,
    type: Number,
  },
});

const encKey = process.env.STRING_32BYTE_BASE64_STRING;
const sigKey = process.env.STRING_64BYTE_BASE64_STRING;

EmployeeSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: [
    "nombre",
    "apellido1",
    "apellido2",
    "telefono1",
    "telefono2",
    "cedula",
  ],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Employee", EmployeeSchema);
