const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const BuffetSchema = Schema({
  codigo: {
    type: String,
    unique: true,
  },
  unidad_medida: {
    type: Schema.Types.ObjectId,
    ref: "UnidadMedida",
  },
  precio: {
    required: true,
    type: Number,
  },
  nombre: {
    required: true,
    type: String,
  },
  tipo_comida: {
    required: true,
    type: String,
  },
  restaurante: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const encKey = process.env.STRING_32BYTE_BASE64_STRING;
const sigKey = process.env.STRING_64BYTE_BASE64_STRING;

BuffetSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["precio", "tipo_comida", "nombre"],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Buffet", BuffetSchema);
