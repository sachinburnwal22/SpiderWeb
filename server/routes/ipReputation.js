const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/ip-reputation", async (req, res) => {
  const { ip } = req.body;
  const apiKey = process.env.IPQS_API_KEY;

  if (!ip) return res.status(400).json({ error: "IP address required" });

  try {
    const url = `https://ipqualityscore.com/api/json/ip/${apiKey}/${ip}?strictness=1&allow_public_access_points=true`;
    const { data } = await axios.get(url);

    if (data.success === false) {
      return res.status(500).json({ error: data.message || "IPQS API error" });
    }

    res.json({
      fraud_score: data.fraud_score,
      is_proxy: data.proxy,
      is_vpn: data.vpn,
      is_tor: data.tor,
      is_abuser: data.recent_abuse,
      is_crawler: data.is_crawler,
      is_bot: data.bot_status,
      isp: data.ISP,
      organization: data.organization,
      country: data.country,
      region: data.region,
      timezone: data.timezone,
      connection_type: data.connection_type,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Server error while checking IP reputation" });
  }
});

module.exports = router;
