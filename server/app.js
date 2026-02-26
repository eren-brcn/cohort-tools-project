const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5005;
const allRoutes = require('./routes/index.routes.js')

// STATIC DATA
// Devs Team - Import the provided files with JSON data of students and cohorts here:
const Student = require("./models/student.model.js");
const Cohort = require("./models/cohort.model.js");

// MONGOOSE CONNECTION
mongoose
  .connect("mongodb://127.0.0.1:27017/cohort-tools-api")
  .then((x) => console.log(`Connected to Database: "${x.connections[0].name}"`))
  .catch((err) => console.error("Error connecting to MongoDB", err));

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
// Middleware to handle all other errors
app.use((err, req, res, next) => {
  console.error("ERROR", req.method, req.path, err);
  res.status(500).json({ message: "Internal server error. Check the server console" });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});