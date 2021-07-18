const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const SupplierSchema = Schema({
  codigo: {
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
    required: true,
    type: String,
  },
  telefono: {
    required: true,
    type: String,
  },
  fax: {
    required: true,
    type: String,
  },
  restaurante: {
    required: true,
    type: String,
  },
});

const encKey = process.env.STRING_32BYTE_BASE64_STRING;
const sigKey = process.env.STRING_64BYTE_BASE64_STRING;

SupplierSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["nombre", "apellido1", "apellido2", "telefono", "fax"],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Supplier", SupplierSchema);
