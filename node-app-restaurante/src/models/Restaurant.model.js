const { Schema, model } = require("mongoose");

const RestaurantSchema = Schema({
  name: {
    require: true,
    type: String,
  },
});

module.exports = model("Restaurant", RestaurantSchema);
