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

module.exports = router;
