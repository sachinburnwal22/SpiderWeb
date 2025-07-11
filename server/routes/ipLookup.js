// server/routes/ipLookup.js
const express = require("express");
const router = express.Router();
const axios = require("axios");

// POST /api/ip-lookup
router.post("/ip-lookup", async (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).json({ error: "IP address is required" });

  try {
    const response = await axios.get(`http://ip-api.com/json/${ip}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch IP details" });
  }
});

module.exports = router;
