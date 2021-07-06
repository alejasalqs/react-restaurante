const { Schema, model } = require("mongoose");

const UsersSchema = Schema({
  consecutivo: {
    type: String,
    unique: true,
  },
  nombre: {
    required: true,
    type: String,
  },
  apellido1: {
    required: true,
    type: String,
  },
  apellido2: {
    type: String,
  },
  restaurante: {
    required: true,
    type: String,
  },
  telefono: {
    type: String,
  },
  celular: {
    type: String,
  },
  login: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  tipo_usuario: {
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

module.exports = model("User", UsersSchema);
