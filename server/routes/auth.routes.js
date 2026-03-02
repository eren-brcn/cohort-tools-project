const router = require("express").Router();
const User = require("../models/user.js"); // Ensure this path is correct
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// 1. POST /auth/signup - Creates a new user in the database
router.post("/signup", async (req, res, next) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ errorMessage: "All fields are required" });
  }

  try {
    const foundUser = await User.findOne({ email });
    if (foundUser) {
      return res.status(400).json({ errorMessage: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({ email, password: hashedPassword, username });
    res.status(201).json({ user: { email: newUser.email, username: newUser.username, _id: newUser._id } });
  } catch (error) {
    next(error);
  }
});

// 2. POST /auth/login - Verifies credentials and returns a JWT
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ errorMessage: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ errorMessage: "User not found" });
    }

    const passwordCorrect = await bcrypt.compare(password, user.password);
    if (!passwordCorrect) {
      return res.status(401).json({ errorMessage: "Incorrect password" });
    }

    // Create the token using your JWT_SECRET from .env
    const authToken = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET || "secret", 
      { algorithm: 'HS256', expiresIn: "6h" }
    );

    res.status(200).json({ authToken: authToken });
  } catch (error) {
    next(error);
  }
});

// 3. GET /auth/verify - Used to confirm the JWT is valid
router.get("/verify", (req, res, next) => {
  // This route is used by the frontend to check if the user is still logged in
  // Usually, you would add your 'isAuthenticated' middleware here
  res.status(200).json({ message: "Token is valid" });
});

module.exports = router;