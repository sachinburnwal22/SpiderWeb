// server/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const ipReputation = require("./routes/ipReputation");
const ipRiskCheck = require("./routes/ipRiskCheck");
const ipQuality = require("./routes/ipQuality");
// Import route modules
const usernameRoutes = require("./routes/username");
const ipLookupRoutes = require("./routes/ipLookup");

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("🕷️ SpiderWeb backend is running 🚀");
});

// API routes
app.use("/api", usernameRoutes);
app.use("/api", ipLookupRoutes); // make sure this file exists in routes/
app.use("/api", ipReputation);
app.use("/api", ipQuality);
app.use("/api", ipRiskCheck);
// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
