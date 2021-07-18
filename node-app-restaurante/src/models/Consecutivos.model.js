const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const ConsecutivoSchema = Schema({
  codigo: {
    type: String,
    unique: true,
  },
  tipo: {
    required: true,
    type: String,
  },
  valor_consecutivo: {
    required: true,
    type: Number,
  },
  descripcion: {
    required: true,
    type: String,
  },
  contiene_prefijo: {
    required: true,
    type: Boolean,
  },
  prefijo: {
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

ConsecutivoSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["descripcion", "fecha"],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Consecutivo", ConsecutivoSchema);
