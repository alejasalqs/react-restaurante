const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const BrandSchema = Schema({
  consecutivo: {
    type: String,
    unique: true,
  },
  nombre: {
    required: true,
    type: String,
  },
  descripcion: {
    required: true,
    type: String,
  },
  restaurante: {
    required: true,
    type: String,
  },
  nacionalidad: {
    required: true,
    type: Number,
  },
  empresa: {
    required: true,
    type: Number,
  },
  telefono_empresa: {
    required: true,
    type: Number,
  },
});

const encKey = process.env.STRING_32BYTE_BASE64_STRING;
const sigKey = process.env.STRING_64BYTE_BASE64_STRING;

BrandSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["nombre", "descripcion", "telefono_empresa"],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Brand", BrandSchema);
