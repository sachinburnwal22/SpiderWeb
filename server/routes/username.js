// server/routes/username.js

const express = require("express");
const router = express.Router();
const axios = require("axios");

const platforms = {
  github: (username) => `https://github.com/${username}`,
  twitter: (username) => `https://twitter.com/${username}`,
  instagram: (username) => `https://instagram.com/${username}`,
  reddit: (username) => `https://www.reddit.com/user/${username}`,
};

router.post("/username-scan", async (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Username is required" });

  const result = {};
  await Promise.all(
    Object.entries(platforms).map(async ([platform, urlFn]) => {
      const url = urlFn(username);
      try {
        const response = await axios.get(url);
        result[platform] = { found: true, url };
      } catch (err) {
        result[platform] = { found: false };
      }
    })
  );

  res.json(result);
});

module.exports = router;
