// routes/ipQuality.js
const express = require("express");
const router = express.Router();
const axios = require("axios");
require("dotenv").config({ path: "../.env" });
const IPQS_API_KEY = process.env.IPQS_API_KEY; // Replace with your real IPQS API key
router.post("/ip-quality", async (req, res) => {
  const { ip } = req.body;
  if (!ip) return res.status(400).json({ error: "IP is required" });

  try {
    const response = await axios.get(
      `https://ipqualityscore.com/api/json/ip/${process.env.IPQS_API_KEY}/${ip}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("IPQualityScore error:", error.message);
    res.status(500).json({ error: "Failed to fetch from IPQualityScore" });
  }
});

module.exports = router;
