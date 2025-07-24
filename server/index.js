// server/index.js
require("dotenv").config({ path: "../.env" }); // <-- this line is CRITICAL

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const domainReconRoutes = require("./routes/domainRecon");
const ipReputation = require("./routes/ipReputation");
const authRoutes = require("./routes/auth");
const ipRiskCheck = require("./routes/ipRiskCheck");
const ipQuality = require("./routes/ipQuality");
const usernameRoutes = require("./routes/username");
const ipLookupRoutes = require("./routes/ipLookup");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🧪 Optional: test if loaded correctly
// console.log("MONGO_URI:", process.env.MONGO_URI);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", usernameRoutes);
app.use("/api", ipLookupRoutes);
app.use("/api", ipReputation);
app.use("/api", ipQuality);
app.use("/api", ipRiskCheck);
app.use("/api/domain-recon", domainReconRoutes);
// Root route
app.get("/", (req, res) => {
  res.send("🕷️ SpiderWeb backend is running 🚀");
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server listening on http://localhost:${PORT}`);
});
