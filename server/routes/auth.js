const express = require("express");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const twilio = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);
const fast2sms = require("fast-two-sms");

const authToken = require("../middleware/auth");
const User = require("../models/User");
const OtpToken = require("../models/OtpToken");
const generateOtp = require("../utils/otpGenerator");

const router = express.Router();

// @route GET api/auth/me
// @desc get currently logged in user
// @access Private
router.get("/me", authToken, async (req, res) => {
  try {
    // return the user without password field if token is authorized
    const user = await User.findById(req.user.id).select("-password");

    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("server error");
  }
});

// @route POST api/auth/phone/register
// @desc register user using phone number
// @access Public
router.post(
  "/phone/register",
  [check("phone", "Please enter a valid phone number").isMobilePhone("any")],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { phone } = req.body;

      if (phone) {
        const code = generateOtp(6);

        const options = {
          authorization: process.env.FAST2SMS_KEY,
          message: `Your code for DoneWithIt is: ${code}. This code is valid for 5 minutes.`,
          numbers: [phone],
        };

        const response = await fast2sms.sendMessage(options);

        const payload = {
          verify: {
            code,
            requestId: response.request_id,
          },
        };

        jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { expiresIn: 300000 },
          async (err, token) => {
            if (err) {
              console.log(err);

              return res.status(500).send("server error");
            }

            const currentUser = await User.findOneAndUpdate(
              { "phone.phoneNumber": phone },
              {
                $set: {
                  "phone.phoneNumber": phone,
                  "phone.verified": false,
                },
              },
              { new: true, upsert: true }
            );

            const otpToken = new OtpToken({
              user: currentUser.id,
              otpToken: token,
            });

            await otpToken.save();

            res.json(response);
          }
        );
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  }
);

// @route POST api/auth/phone/verify
// @desc verify user using otp code
// @access Public
router.post(
  "/phone/verify",
  [
    check("phone", "Please enter a valid phone number").isMobilePhone("any"),
    check("code", "Please enter a valid OTP").isLength({ min: 6, max: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { phone, code } = req.body;

      if (phone && code) {
        const currentUser = await User.findOne({
          "phone.phoneNumber": phone,
        });

        if (!currentUser)
          return res.status(400).json({
            errors: [{ msg: "Unable to verify user" }],
          });

        const currentOtpToken = await OtpToken.findOne({
          user: currentUser.id,
        });

        if (!currentOtpToken)
          return res.status(400).json({
            errors: [{ msg: "Invalid credentials" }],
          });

        const decodedPayload = jwt.verify(
          currentOtpToken.otpToken,
          process.env.JWT_SECRET
        );

        if (code === decodedPayload.verify.code) {
          // change verified status and save
          currentUser.phone.verified = true;
          await currentUser.save();

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
        } else {
          res.status(400).json({
            errors: [{ msg: "Invalid credentials" }],
          });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).send("server error");
    }
  }
);

// @route POST api/auth/phone/register
// @desc register user using phone number
// @access Public
// router.post(
//   "/phone/register",
//   [check("phone", "Please enter a valid phone number").isMobilePhone("any")],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { phone } = req.body;

//       if (phone) {
//         twilio.verify
//           .services(process.env.TWILIO_SERVICE_SID)
//           .verifications.create({ to: phone, channel: "sms" })
//           .then(async (verification) => {
//             const user = await User.findOneAndUpdate(
//               { "phone.phoneNumber": phone },
//               { $set: { "phone.phoneNumber": phone, "phone.verified": false } },
//               { new: true, upsert: true }
//             );

//             return res.json({ verification, user });
//           })
//           .catch((err) => {
//             console.log(err);
//             return res.status(400).json({
//               errors: [{ msg: "Unable to send OTP" }],
//             });
//           });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("server error");
//     }
//   }
// );

// // @route POST api/auth/phone/verify
// // @desc verify user using otp code
// // @access Public
// router.post(
//   "/phone/verify",
//   [
//     check("phone", "Please enter a valid phone number").isMobilePhone("any"),
//     // check("code", "Please enter a valid OTP").isLength({ min: 6, max: 6 }),
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     try {
//       const { phone, code } = req.body;

//       if (phone && code) {
//         twilio.verify
//           .services(process.env.TWILIO_SERVICE_SID)
//           .verificationChecks.create({ to: phone, code })
//           .then(async (verificationCheck) => {
//             if (verificationCheck.status === "approved") {
//               const currentUser = await User.findOne({
//                 "phone.phoneNumber": phone,
//               });

//               if (!currentUser)
//                 return res.status(400).json({
//                   errors: [{ msg: "Unable to verify user" }],
//                 });

//               // change verified status and save
//               currentUser.phone.verified = true;
//               await currentUser.save();

//               // return json web token
//               // to keep user signed in
//               const payload = {
//                 user: {
//                   // getting "_id" from the user model
//                   id: currentUser.id,
//                 },
//               };

//               jwt.sign(
//                 payload,
//                 process.env.JWT_SECRET,
//                 { expiresIn: 360000 },
//                 async (err, token) => {
//                   if (err) {
//                     console.log("here errr");
//                     throw err;
//                   }

//                   res.json({ token: token });
//                 }
//               );
//             } else {
//               res.status(400).json({
//                 errors: [{ msg: "Invalid credentials" }],
//               });
//             }
//           })
//           .catch((err) => {
//             console.log(err);
//             return res.status(400).json({
//               errors: [{ msg: "Unable to verify user" }],
//             });
//           });
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).send("server error");
//     }
//   }
// );

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
