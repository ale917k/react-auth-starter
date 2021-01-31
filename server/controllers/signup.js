const nodemailer = require("nodemailer");

// Session util
const sessions = require("./sessions");

// Set up transport protocols and authentication
const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAIL_USER_KEY,
    pass: process.env.MAIL_PASS_KEY,
  },
});

// Register new user through passport authentication
const handleSignup = (User, passport, req, res) => {
  return new Promise((resolve, reject) => {
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
              reject({
                message: "Failed Sending Email",
                error: err,
              });
            } else {
              resolve({
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
        reject({
          message: "Failed Creating User",
          error: err,
        });
      });
  });
};

// Register new user and generate new session
const signupAuthentication = (User, passport) => (req, res) => {
  handleSignup(User, passport, req, res)
    .then((data) =>
      data.result._id
        ? sessions.createSessions(data.result)
        : Promise.reject(data)
    )
    .then((session) => res.status(201).json(session))
    .catch((err) => res.status(500).json(err));
};

module.exports = {
  signupAuthentication: signupAuthentication,
};
