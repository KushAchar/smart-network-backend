const mongoose = require("mongoose");

const deviceSchema = new mongoose.Schema({
  name: String,
  url: String,
  status: {
    type: String,
    default: "UNKNOWN"
  },
  responseTime: Number,
  lastChecked: Date
});

module.exports = mongoose.model("Device", deviceSchema);
