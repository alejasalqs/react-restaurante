const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
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

/*ProductSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["db_name"],
});*/
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Product", ProductSchema);
