const { Schema, model } = require("mongoose");

const RestaurantSchema = Schema({
  nombre: {
    require: true,
    type: String,
  },
  consecutivo: {
    require: true,
    type: String,
  },
  direccion: {
    type: String,
  },
  cantidad_clientes: {
    require: true,
    type: Number,
  },
  telefono: {
    require: true,
    type: String,
  },
  empleados: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],
  especiales: [
    {
      type: Schema.Types.ObjectId,
      ref: "Special",
    },
  ],
  bebidas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Drink",
    },
  ],
  usuarios: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  clientes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
  ],
  proveedores: [
    {
      type: Schema.Types.ObjectId,
      ref: "Suplier",
    },
  ],
  productos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Products",
    },
  ],
  mesas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Table",
    },
  ],
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

module.exports = model("Restaurant", RestaurantSchema);
