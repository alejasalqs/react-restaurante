const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const PositionSchema = Schema({
  consecutivo: {
    type: String,
    unique: true,
  },
  nombre: {
    required: true,
    type: String,
  },
  rol: {
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

PositionSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["nombre","rol"],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Position", PositionSchema);
