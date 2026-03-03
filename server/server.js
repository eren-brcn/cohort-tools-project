const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config(); // Loads PORT and MONGODB_URI from .env

const app = express();

// 1. Middleware
app.use(express.json()); 
app.use(morgan("dev"));

// 2. Database Connection
// Uses the URI from your .env file or falls back to your local DB
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cohort-tools-api";

mongoose.connect(MONGO_URI)
  .then(x => console.log(`\x1b[32m+++ Connected to MongoDB: "${x.connections[0].name}"\x1b[0m`))
  .catch(err => console.error("!!! Database connection failed", err));

// 3. Routes
const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);
// Home route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Cohort Tools API!");
});

const indexRouter = require("./routes/index.routes");
app.use("/api", indexRouter);

// 4. Start Server
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
 
  console.log(`\x1b[32m>>> Server listening on\x1b[0m http://localhost:${PORT}`);
});