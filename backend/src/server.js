// backend/src/server.js

const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");

const authRoutes = require("./routes/auth.routes");
const voterRoutes = require("./routes/voter.routes");
const spectatorRoutes = require("./routes/spectator.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();

app.use(cors());
app.use(express.json());

// ==============================
// API ROUTES
// ==============================
app.use("/api/auth", authRoutes);
app.use("/api/voter", voterRoutes);
app.use("/api/spectator", spectatorRoutes);
app.use("/api/admin", adminRoutes);

// ==============================
// SERVE FRONTEND
// ==============================

const frontendPath = path.join(__dirname, "../../frontend");
app.use(express.static(frontendPath));

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK" });
});

const PORT = 4000;

sequelize.sync().then(() => {
  console.log("Database synced");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});