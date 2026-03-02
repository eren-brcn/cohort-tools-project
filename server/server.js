const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const app = express();

// Middleware
app.use(express.json()); 
app.use(morgan("dev"));

// Database Connection
mongoose.connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then(x => console.log(`\x1b[32m+++ Connected to MongoDB: "${x.connections[0].name}"\x1b[0m`))
  .catch(err => console.error("!!! Database connection failed", err));

// Routes
const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter); 

const indexRouter = require("./routes/index.routes");
app.use("/api", indexRouter);

// Start Server
const PORT = 5005;
app.listen(PORT, () => {
  console.log(`\x1b[32m>>> Server listening on http://localhost:${PORT}\x1b[0m`);
});