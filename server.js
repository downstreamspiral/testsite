const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const fingerprintJsServerApi = require("@fingerprintjs/fingerprintjs-pro-server-api");
const { Sequelize, Op } = require("sequelize");
const bcrypt = require("bcrypt");
const UserModel = require("./models/User");
const DeviceFingerprintModel = require("./models/DeviceFingerprint");

const app = express();
const PORT = 5000;

// Initialize the Fingerprint Server API client instance
const client = new fingerprintJsServerApi.FingerprintJsServerApiClient({
  apiKey: "SECRET_API_KEY",
  region: fingerprintJsServerApi.Region.Global,
});

// Initialize sequelize with SQLite database connection
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./db/database.db",
});

// Create model instances
const User = UserModel(sequelize);
const DeviceFingerprint = DeviceFingerprintModel(sequelize);

// Set the view engine to ejs
app.set("view engine", "ejs");

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Define routes
// Display the registration page
app.get("/register", (req, res) => {
  res.render("register");
});

// Display the dashboard
app.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

// Function to start the server
function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

(async () => {
  await sequelize.sync({ alter: true });

  console.log("Model synchronized successfully");

  startServer();
})();