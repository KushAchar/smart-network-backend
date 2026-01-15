const express = require("express");
const Device = require("../models/Device");

const router = express.Router();

router.post("/add", async (req, res) => {
  const device = new Device(req.body);
  await device.save();
  res.json(device);
});

router.get("/", async (req, res) => {
  const devices = await Device.find();
  res.json(devices);
});
// Delete device by ID
router.delete("/:id", async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);
    res.json({ message: "Device deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete device" });
  }
});


module.exports = router;
