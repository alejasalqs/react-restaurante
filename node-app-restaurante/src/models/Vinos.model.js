const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const VinosSchema = Schema({
  codigo: {
    type: String,
  },
  nombre: {
    required: true,
    type: String,
  },
  marca: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
  nacionalidad: {
    type: Schema.Types.ObjectId,
    ref: "Country",
  },
  precio_botella: {
    required: true,
    type: Number,
  },
  descripcion: {
    required: true,
    type: String,
  },
  precio_unitario: {
    required: true,
    type: Number,
  },
  cantidad: {
    required: true,
    type: Number,
  },
  anio_cosecha: {
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

VinosSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: [
    "precio_botella",
    "precio_unitario",
    "nombre",
    "cantidad",
    "descripcion",
    "marca",
    "nacionalidad",
    "anio_cosecha",
  ],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Vinos", VinosSchema);
