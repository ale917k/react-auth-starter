let express = require("express"),
  passport = require("passport"),
  nodemailer = require("nodemailer"),
  router = express.Router();

// User model
let User = require("../models/User");

router.use(passport.initialize());
router.use(passport.session());

// Set up transport protocols and authentication
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER_KEY,
    pass: process.env.MAIL_PASS_KEY,
  },
});

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
  .post((req, res) => {
    User.register(
      { email: req.body.email, username: req.body.username },
      req.body.password
    )
      .then((result) => {
        passport.authenticate("local")(req, res, () => {
          const registrationConfirmationEmail = {
            from: process.env.MAIL_SENDER,
            to: req.body.email,
            subject: "Registration Confirmation",
            html: req.body.messageHtml,
          };

          transport.sendMail(registrationConfirmationEmail, (err, info) => {
            if (err) {
              res.status(500).json({
                message: "Failed Sending Email",
                error: err,
              });
            } else {
              res.status(201).json({
                message: "Created User Successfully",
                result: {
                  ...result._doc,
                  hash: undefined,
                  salt: undefined,
                },
              });
            }
          });
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Failed Creating User",
          error: err,
        });
      });
  });

// Requests targetting a specific User
router.post("/signin", (req, res) => {
  const user = new User({
    username: req.body.username,
  });

  req.login(user, (err, result) => {
    if (!err) {
      passport.authenticate("local", {
        failureRedirect: "/users/failedSignin",
      })(req, res, () => {
        res.status(201).json({
          message: "Signed in User Successfully",
          result: { ...req.user._doc, hash: undefined, salt: undefined },
        });
      });
    } else {
      console.log(err);
      res.status(500).json({
        message: "Failed Signin in User",
        error: err,
      });
    }
  });
});

router.get("/failedSignin", (req, res) => {
  res.status(401).json("Unauthorized access");
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
    User.updateOne(
      { _id: req.params.userId },
      {
        ...req.body,
      }
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
