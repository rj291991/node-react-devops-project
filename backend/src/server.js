
require("dotenv").config();

const express = require("express");
const pool = require("./db");

const app = express();

const APP_VERSION = process.env.APP_VERSION || "1.0.0";

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "devops-demo-backend",
    version: APP_VERSION,
  });
});

app.get("/ready", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.status(200).json({ status: "ready" });
  } catch {
    res.status(503).json({ status: "not_ready" });
  }
});

app.get("/api/message", (req, res) => {
  res.json({
    message: "Hello from the DevOps Demo Backend!",
    version: APP_VERSION,
  });
});

app.get("/api/users", async (req, res) => {
  try {
    const [users] = await pool.query(
      "SELECT id, name, email, created_at FROM users ORDER BY id"
    );

    res.json(users);
  } catch (error) {
    console.error("Failed to fetch users:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

if (require.main === module) {
  const PORT = process.env.PORT || 3000;

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend listening on port ${PORT}`);
  });
}

module.exports = app;
