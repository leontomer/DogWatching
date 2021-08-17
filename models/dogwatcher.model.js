const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dogWatcherSchema = new Schema({
  name: { type: String, required: true },
  startDate: { type: String, required: true },
  endDate: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  city: { type: String, required: true },
  dogWatcher: { type: Boolean, required: true },
});

module.exports = dogWatcher = mongoose.model("dogWatcher", dogWatcherSchema);
