const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const LimpiezaSchema = Schema({
  codigo: {
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
  cantidad: {
    required: true,
    type: String,
  },
  tipo: {
    required: true,
    type: String,
  },
  cantidad_medida: {
    required: true,
    type: String,
  },
  unidad_medida: {
    type: Schema.Types.ObjectId,
    ref: "UnidadMedida",
  },
  marca: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
  restaurante: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const encKey = process.env.STRING_32BYTE_BASE64_STRING;
const sigKey = process.env.STRING_64BYTE_BASE64_STRING;

LimpiezaSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: [
    "nombre",
    "cantidad",
    "descripcion",
    "tipo",
    "cantidad_medida",
  ],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Limpieza", LimpiezaSchema);
