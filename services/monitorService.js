const axios = require("axios");
const Device = require("../models/Device");

async function checkDevices() {
  const devices = await Device.find();

  for (let device of devices) {
    const start = Date.now();
    try {
      await axios.get(device.url, { timeout: 5000 });
      device.status = "UP";
      device.responseTime = Date.now() - start;
    } catch (err) {
      device.status = "DOWN";
      device.responseTime = 0;
    }

    device.lastChecked = new Date();
    await device.save();

    // ✅ Log for confirmation
    console.log(`Checked ${device.name} → ${device.status}`);
  }
}

module.exports = checkDevices;
