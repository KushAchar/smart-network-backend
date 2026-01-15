const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cron = require("node-cron");

const deviceRoutes = require("./routes/deviceRoutes");
const monitorDevices = require("./services/monitorService");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ FIXED MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/network_monitor")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.use("/api/devices", deviceRoutes);

// ✅ Run monitoring every 1 minute
cron.schedule("*/1 * * * *", () => {
  console.log("Running device monitoring...");
  monitorDevices();
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
