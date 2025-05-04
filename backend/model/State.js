const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: true,
  },
});

const State = mongoose.model("State", stateSchema);

module.exports = { State };