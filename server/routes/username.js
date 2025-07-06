// server/routes/username.js

const express = require("express");
const router = express.Router();
const axios = require("axios");

const platforms = {
  github: (username) => `https://github.com/${username}`,
  twitter: (username) => `https://twitter.com/${username}`,
  instagram: (username) => `https://instagram.com/${username}`,
  reddit: (username) => `https://www.reddit.com/user/${username}`,
  pinterest: (username) => `https://www.pinterest.com/${username}`,
  devto: (username) => `https://dev.to/${username}`,
  medium: (username) => `https://medium.com/@${username}`,
  tumblr: (username) => `https://${username}.tumblr.com`,
  soundcloud: (username) => `https://soundcloud.com/${username}`,
  vimeo: (username) => `https://vimeo.com/${username}`,
  producthunt: (username) => `https://www.producthunt.com/@${username}`,
  aboutme: (username) => `https://about.me/${username}`,
  githubgist: (username) => `https://gist.github.com/${username}`,
  codepen: (username) => `https://codepen.io/${username}`,
  replit: (username) => `https://replit.com/@${username}`,
  flipboard: (username) => `https://flipboard.com/@${username}`,
  slideshare: (username) => `https://slideshare.net/${username}`,
  wattpad: (username) => `https://www.wattpad.com/user/${username}`,
  goodreads: (username) => `https://www.goodreads.com/user/show/${username}`,
  behance: (username) => `https://www.behance.net/${username}`,
  dribbble: (username) => `https://dribbble.com/${username}`,
  stackoverflow: (username) => `https://stackoverflow.com/users/${username}`,
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
        result[platform] = { found: response.status === 200, url };
      } catch {
        result[platform] = { found: false };
      }
    })
  );

  res.json(result);
});

module.exports = router;
