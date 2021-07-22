const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const RestaurantSchema = Schema({
  nombre: {
    require: true,
    type: String,
  },
  codigo: {
    type: String,
    unique: true,
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
  buffets: [
    {
      type: Schema.Types.ObjectId,
      ref: "Buffet",
    },
  ],
  comestibles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comestible",
    },
  ],
  desechables: [
    {
      type: Schema.Types.ObjectId,
      ref: "Desechables",
    },
  ],
  equipos_cocina: [
    {
      type: Schema.Types.ObjectId,
      ref: "Equipos",
    },
  ],
  especiales: [
    {
      type: Schema.Types.ObjectId,
      ref: "Especiales",
    },
  ],
  limpieza: [
    {
      type: Schema.Types.ObjectId,
      ref: "Limpieza",
    },
  ],
  tecnologia: [
    {
      type: Schema.Types.ObjectId,
      ref: "Tecnologia",
    },
  ],
  unidades_medida: [
    {
      type: Schema.Types.ObjectId,
      ref: "UnidadMedida",
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
  bitacora: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bitacora",
    },
  ],
  marcas: [
    {
      type: Schema.Types.ObjectId,
      ref: "Brand",
    },
  ],
});

const encKey = process.env.STRING_32BYTE_BASE64_STRING;
const sigKey = process.env.STRING_64BYTE_BASE64_STRING;

RestaurantSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: [
    "nombre",
    "direccion",
    "cantidad_clientes",
    "telefono",
    "empleados",
    "especiales",
    "bebidas",
    "clientes",
    "proveedores",
    "buffets",
    "comestibles",
    "desechables",
    "equipos_cocina",
    "limpieza",
    "tecnologia",
    "unidades_medida",
    "mesas",
    "puestos",
    "consecutivos",
    "roles",
    "cajas",
    "bitacora",
  ],
});
// This adds _ct and _ac fields to the schema, as well as pre 'init' and pre 'save' middleware,
// and encrypt, decrypt, sign, and authenticate instance methods

module.exports = model("Restaurant", RestaurantSchema);
