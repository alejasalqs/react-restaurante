const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const RolSchema = Schema({
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
  restaurante: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const encKey = process.env.STRING_32BYTE_BASE64_STRING;
const sigKey = process.env.STRING_64BYTE_BASE64_STRING;

RolSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["nombre", "descripcion"],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Rol", RolSchema);
