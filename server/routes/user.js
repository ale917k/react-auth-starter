const express = require("express"),
  passport = require("passport"),
  router = express.Router();

// User model
const User = require("../models/User");

// User controllers
const signin = require("../controllers/signin");
const signup = require("../controllers/signup");

router.use(passport.initialize());
router.use(passport.session());

// Requests targetting all Users
router
  .route("/")
  .get((req, res) => {
    User.find()
      .then((result) => {
        res.status(201).json({
          message: "Retrieved Users Successfully",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Failed Retrieving Users",
          error: err,
        });
      });
  })
  .post(signup.signupAuthentication(User, passport));

// Requests targetting a specific User
router.post("/signin", signin.signinAuthentication(User, passport));

router.get("/failedSignin", (req, res) => {
  res.status(401).json({
    error: "Unauthorized Access",
  });
});

router
  .route("/:userId")
  .get((req, res) => {
    User.findOne({ _id: req.params.userId })
      .then((result) => {
        res.status(201).json({
          message: "Retrieved User Successfully",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Failed Retrieving User",
          error: err,
        });
      });
  })
  .patch((req, res) => {
    // Set New Password
    if (req.body.oldPassword) {
      User.findOne({ _id: req.params.userId })
        .then((user) => {
          if (user) {
            user.changePassword(
              req.body.oldPassword,
              req.body.newPassword,
              (err) => {
                if (err) {
                  res.status(500).json({
                    message:
                      "Incorrect Old Password. Failed Setting New Password",
                    error: err,
                  });
                } else {
                  res.status(201).json({
                    message: "Set New Password Successfully",
                    result: {
                      ...user._doc,
                      hash: undefined,
                      salt: undefined,
                    },
                  });
                }
              }
            );
          } else {
            console.log(err);
            res.status(500).json({
              message: "This User does not exist. Failed Setting New Password",
              error: err,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "Failed Setting New Password",
            error: err,
          });
        });
      // Reset Password
    } else if (req.body.newPassword) {
      User.findOne({ _id: req.params.userId })
        .then((user) => {
          if (user) {
            user.setPassword(req.body.newPassword, (err) => {
              if (err) {
                res.status(500).json({
                  message: "Failed Resetting Password",
                  error: err,
                });
              } else {
                user.save();
                res.status(201).json({
                  message: "Resetted Password Successfully",
                  result: {
                    ...user._doc,
                    hash: undefined,
                    salt: undefined,
                  },
                });
              }
            });
          } else {
            console.log(err);
            res.status(500).json({
              message: "This User does not exist. Failed Resetting Password",
              error: err,
            });
          }
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "Failed Resetting Password",
            error: err,
          });
        });
      // Update User information
    } else {
      User.updateOne(
        { _id: req.params.userId },
        {
          ...req.body,
        }
      )
        .then((result, test) => {
          res.status(201).json({
            message: "Updated User Successfully",
            result: result,
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            message: "Failed Updating User",
            error: err,
          });
        });
    }
  })
  .delete((req, res) => {
    User.deleteOne({ _id: req.params.userId })
      .then((result) => {
        res.status(201).json({
          message: "Deleted User Successfully",
          result: result,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Failed Deleting User",
          error: err,
        });
      });
  });

module.exports = router;
