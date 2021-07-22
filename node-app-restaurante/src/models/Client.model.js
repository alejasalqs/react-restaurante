const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const ClientSchema = Schema({
  consecutivo: {
    type: String,
    unique: true,
  },
  nombre_completo: {
    required: true,
    type: String,
  },
  restaurante: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  monto_pagado: {
    required: true,
    type: Number,
  },
  detalle: {
    type: String,
  },
  fecha: {
    type: Date,
  },
  reservacion: {
    type: Boolean,
  },
  barra: {
    type: Boolean,
  },
});

const encKey = process.env.STRING_32BYTE_BASE64_STRING;
const sigKey = process.env.STRING_64BYTE_BASE64_STRING;

ClientSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["nombre_completo", "monto_pagado", "detalle", "fecha"],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Client", ClientSchema);
