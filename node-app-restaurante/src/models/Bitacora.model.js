const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const BitacoraSchema = Schema({
  codigo: {
    type: String,
    unique: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  fecha: {
    required: true,
    type: Date,
  },
  descripcion: {
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

BitacoraSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["descripcion", "fecha"],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Bitacora", BitacoraSchema);
