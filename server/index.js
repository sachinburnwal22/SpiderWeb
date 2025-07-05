const express = require("express");
const cors = require("cors");
const usernameRoutes = require("./routes/username");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("SpiderWeb backend is running 🚀");
});

app.use("/api", usernameRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
