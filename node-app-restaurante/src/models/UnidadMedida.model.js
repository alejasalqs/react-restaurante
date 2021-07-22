const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const UnidadMedidaSchema = Schema({
  codigo: {
    type: String,
  },
  unidad: {
    required: true,
    type: String,
  },
  detalle: {
    required: true,
    type: String,
  },
  escala: {
    required: true,
    type: String,
  },
  simbolo: {
    required: true,
    type: String,
  },
  simbologia: {
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

UnidadMedidaSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["unidad", "detalle", "escala", "simbolo", "simbologia"],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("UnidadMedida", UnidadMedidaSchema);
