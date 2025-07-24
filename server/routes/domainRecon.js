require("dotenv").config();
const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/subdomains", async (req, res) => {
  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({ error: "Domain is required." });
  }

  try {
    const response = await axios.post(
      "https://api.netlas.io/v1/search",
      {
        query: `domain:${domain}`,
        source: "dnsname",
        size: 100,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NETLAS_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const items = response.data.items || [];

    const subdomains = items
      .map((item) => item.data.name)
      .filter((name) => name && name.endsWith(domain));

    res.json({ subdomains });
  } catch (error) {
    console.error(
      "🔴 Netlas API Error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      error: "Failed to fetch subdomains.",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
