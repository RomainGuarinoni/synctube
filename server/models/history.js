const mongoose = require("mongoose");

const historySchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  titre: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    requireed: true,
  },
  date: {
    type: Date,
    required: true,
  },
  roomID: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("history", historySchema);
