const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const CountrySchema = Schema({
  codigo: {
    type: String,
    unique: true,
  },
  pais: {
    required: true,
    type: Date,
  },
});

const encKey = process.env.STRING_32BYTE_BASE64_STRING;
const sigKey = process.env.STRING_64BYTE_BASE64_STRING;

CountrySchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["descripcion", "fecha"],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Country", CountrySchema);
