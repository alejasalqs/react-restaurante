const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const BebidaCalienteSchema = Schema({
  codigo: {
    type: String,
  },
  nombre: {
    required: true,
    type: String,
  },
  ingredientes: {
    required: true,
    type: String,
  },
  descripcion: {
    required: true,
    type: String,
  },
  precio: {
    required: true,
    type: Number,
  },
  restaurante: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const encKey = process.env.STRING_32BYTE_BASE64_STRING;
const sigKey = process.env.STRING_64BYTE_BASE64_STRING;

BebidaCalienteSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["precio", "nombre", "ingredientes", "descripcion"],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("BebidaCaliente", BebidaCalienteSchema);
