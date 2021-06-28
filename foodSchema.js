const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  name: String,
  description: String,
  photo: String,
  serving: String,
  status: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("food", foodSchema);
