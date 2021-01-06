// Session utils
const sessions = require("./sessions");

// Log user through passport authentication
const handleSignin = (User, passport, req, res) => {
  const user = new User({
    username: req.body.username,
  });

  return new Promise((resolve, reject) => {
    try {
      req.login(user, (err) => {
        if (!err) {
          passport.authenticate("local", {
            failureRedirect: "/users/failedSignin",
          })(req, res, () => {
            resolve({
              message: "Signed in User Successfully",
              result: {
                ...req.user._doc,
                hash: undefined,
                salt: undefined,
              },
            });
          });
        } else {
          reject({
            message: "Failed Signin in User",
            error: err,
          });
        }
      });
    } catch (err) {
      reject(err);
    }
  });
};

// Check if user has session, if not then authenticate and create new session
const signinAuthentication = (User, passport) => (req, res) => {
  const { authorization } = req.headers;

  authorization
    ? sessions
        .getAuthTokenId(authorization)
        .then((reply) => res.status(201).json(reply))
        .catch((err) =>
          res.status(400).json({
            message: "Unauthorized",
            error: err,
          })
        )
    : handleSignin(User, passport, req, res)
        .then((data) =>
          data.result._id
            ? sessions.createSessions(data.result)
            : Promise.reject(data)
        )
        .then((session) => res.status(201).json(session))
        .catch((err) => res.status(500).json(err));
};

module.exports = {
  signinAuthentication: signinAuthentication,
};
