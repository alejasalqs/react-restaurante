const { Schema, model } = require("mongoose");

const TableSchema = Schema({
  consecutivo: {
    type: String,
    unique: true,
  },
  nombre: {
    required: true,
    type: String,
  },
  numero: {
    required: true,
    type: Number,
  },
  restaurante: {
    required: true,
    type: String,
  },
  cantidad_sillas: {
    required: true,
    type: Number,
  },
});

const encKey = process.env.STRING_32BYTE_BASE64_STRING;
const sigKey = process.env.STRING_64BYTE_BASE64_STRING;

/*DataBaseSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["db_name"],
});*/
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Table", TableSchema);
