const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const RestaurantSchema = Schema({
  nombre: {
    require: true,
    type: String,
    unique: true,
  },
  consecutivo: {
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
  puestos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Position",
    },
  ],
  consecutivos: [
    {
      type: Schema.Types.ObjectId,
      ref: "Consecutivo",
    },
  ],
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Rol",
    },
  ],
  cajas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Caja",
    },
  ],
});

const encKey = process.env.STRING_32BYTE_BASE64_STRING;
const sigKey = process.env.STRING_64BYTE_BASE64_STRING;

RestaurantSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["nombre", "direccion", "cantidad_clientes", "telefono"],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Restaurant", RestaurantSchema);
