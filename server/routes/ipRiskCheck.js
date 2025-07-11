const express = require("express");
const axios = require("axios");
const router = express.Router();

const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your actual IPQualityScore API key

router.post("/ip-risk", async (req, res) => {
  const { ip } = req.body;

  if (!ip) {
    return res.status(400).json({ error: "IP address is required." });
  }

  try {
    const response = await axios.get(
      `https://ipqualityscore.com/api/json/ip/${API_KEY}/${ip}`,
      {
        params: {
          strictness: 1,
          allow_public_access_points: true,
          fast: true,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("IPQualityScore API error:", error.message);
    res.status(500).json({ error: "Failed to fetch risk data." });
  }
});

module.exports = router;
