const router = require("express").Router();
const User = require("../models/User.model");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

router.post("/signup", async (req, res, next) => {
  console.log(req.body);

  const { email, password, username } = req.body;

  // validators?

  // are the 3fileds recieved

  if (!email || !password || !username) {
    res.status(400).json({ errorMessage: "all fields are not complete" });
    return; //stop the route contuining will not crash
  }

  //email correct ?(etra) same with password

  // password strong enought

  const passwordRegex =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/gm;

  if (passwordRegex.test(password) === false) {
    res.status(400).json({ errorMessage: "wrong  paswword" });
    return; //stop the route contuining will not crash
  }

  //password not store with hashing ()

  try {
    // does the mail already exist

    const foundUser = await User.findOne({ email: email });

    if (foundUser) {
      res.status(400).json({ errorMessage: "user already exist " });
      return; //stop the route contuining will not crash
    }

    //

    const hashPassword = await bcrypt.hash(password, 12);

    const response = await User.create({
      email: email,
      password: hashPassword,
      username: username,
    });
    res.status(201).json(response);
  } catch (error) {
    next(error);
  }
});


module.exports = router;