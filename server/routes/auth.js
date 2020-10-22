const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

// @route POST api/auth/login
// @desc login user and get token
// @access Public
router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").exists(),
  ],
  async (req, res) => {
    console.log("login route hit");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // check if the email exists
      let currentUser = await User.findOne({ email: req.body.email });

      if (!currentUser) {
        return res.status(400).json({
          errors: [{ msg: "Invalid credentials" }],
        });
      }

      // compare the entered password
      const isMatched = await bcrypt.compare(
        req.body.password,
        currentUser.password
      );
      if (!isMatched)
        return res.status(400).json({
          errors: [{ msg: "Invalid credentials" }],
        });

      // return json web token
      // to keep user signed in
      const payload = {
        user: {
          // getting "_id" from the user model
          id: currentUser.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        async (err, token) => {
          if (err) {
            console.log("here errr");
            throw err;
          }

          res.json({ token: token });
        }
      );
    } catch (error) {
      console.log(error);
      console.log("error");
      res.status(500).send("server error");
    }
  }
);

// @route POST api/auth/register
// @desc register user and get token
// @access Public
router.post(
  "/register",
  [
    check("name", "Please enter a name!").notEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Password must be 6 or more characters long").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    console.log("register route hit");
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let newUser = await User.findOne({ email: req.body.email });

      // check if the email already exists
      if (newUser) {
        return res.status(400).json({
          errors: [{ msg: "User already exists!" }],
        });
      }

      // hash pasword
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      newUser = User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
      });

      // save the user
      await newUser.save();

      // return json web token
      // to keep user signed in
      const payload = {
        user: {
          // getting "_id" from the user model
          id: newUser.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token: token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
