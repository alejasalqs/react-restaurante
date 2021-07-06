const { Schema, model } = require("mongoose");
const encrypt = require("mongoose-encryption");

const DataBaseSchema = Schema({
  db_name: {
    require: true,
    type: String,
  },
  restaurants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
  usuarios: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
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

module.exports = model("DataBase", DataBaseSchema);
