import express from "express";
import passport from "passport";
import { NativeError } from "mongoose";
import User from "../models/User";
import signinAuthentication from "../controllers/signin";
import signupAuthentication from "../controllers/signup";

const router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

// Requests targetting all Users
router
  .route("/")
  .get((_, res) => {
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
  .post(signupAuthentication(User));

// Requests targetting a specific User
router.post("/signin", signinAuthentication(User));

router.get("/failedSignin", (_, res) => {
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
          console.log("user", user);
          if (user) {
            user.changePassword(req.body.oldPassword, req.body.newPassword, (err) => {
              if (err) {
                res.status(500).json({
                  message: "Incorrect Old Password. Failed Setting New Password",
                  error: err,
                });
              } else {
                const { hash, salt, ...updatedUser } = user;
                res.status(201).json({
                  message: "Set New Password Successfully",
                  result: updatedUser,
                });
              }
            });
          } else {
            res.status(500).json({
              message: "This User does not exist. Failed Setting New Password",
              error: true,
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
            user.setPassword(req.body.newPassword, (err: NativeError) => {
              if (err) {
                res.status(500).json({
                  message: "Failed Resetting Password",
                  error: err,
                });
              } else {
                user.save();
                const { hash, salt, ...updatedUser } = user;
                res.status(201).json({
                  message: "Resetted Password Successfully",
                  result: updatedUser,
                });
              }
            });
          } else {
            res.status(500).json({
              message: "This User does not exist. Failed Resetting Password",
              error: true,
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
        },
      )
        .then((result) => {
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

export default router;
