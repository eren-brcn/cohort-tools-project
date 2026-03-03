// load .env variables early
require('dotenv').config();

const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5005;
const allRoutes = require('./routes/index.routes.js')
const authRoutes = require('./routes/auth.routes.js')
const User = require('./models/user.js');
// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const Student = require("./models/student.model.js");
const Cohort = require("./models/cohort.model.js");

// MONGOOSE CONNECTION
const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cohort-tools-api";
mongoose
  .connect(MONGO_URI)
  .then((x) => console.log(`\x1b[32m✓ Connected to Database: "${x.connections[0].name}"\x1b[0m`))
  .catch((err) => console.error("\x1b[31m✗ Database connection failed\x1b[0m", err));

// INITIALIZE EXPRESS APP - https://expressjs.com/en/4x/api.html#express
const app = express();

// MIDDLEWARE
// Research Team - Set up CORS middleware here:
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://example.com']
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/auth', authRoutes);
app.use('/api', allRoutes);
// ROUTES - https://expressjs.com/en/starter/basic-routing.html
// Devs Team - Start working on the routes here:

// Middleware for 404 errors (Not Found)
app.use((req, res, next) => {
  res.status(404).json({ message: "This route does not exist" });
});

// Middleware for general errors (500)
app.use((err, req, res, next) => {
  console.error("ERROR", req.method, req.path, err);
  res.status(500).json({ message: "Internal server error. Check the server console" });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`\x1b[32m>>> Server listening on\x1b[0m http://localhost:${PORT}`);
});